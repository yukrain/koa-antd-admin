//var User     = require( './../model/user' );

var session = require('./session');
var bcrypt = require('bcryptjs');
var captcha = require('koa-canvas-captcha');
var fs = require('fs');
var path = require('path');
var uploader = require('./uploader');
var superusers = {
    "admin": "e10adc3949ba59abbe56e057f20f883e" //md5一次以后的密码 admin 123456 暂时
};

module.exports = {
    index: function*(){
        if(this.session.login){
            yield this.render('index',{
                "title":"后台",
                state: this.state,
                __INITIAL_STATE__: JSON.stringify({ username: this.session.username})
            });
        }else{
            this.redirect("/login");
        }
    },
    loginRender: function*(){

        var verify_code = Math.random().toString(36).slice(2);
        this.session.verify_code = verify_code;
        yield this.render('login',{"title":"登陆", verify_code: verify_code, state: this.state});
    },


    redirectIndex: function*(){
        this.redirect("/app");
    },

    login: function*(){
        var params  = this.request.body;

        if(params.captcha.toString().toLocaleUpperCase() !== this.session.captcha.toString()){
            throw new Error('验证码错误')
        }else{
            if(params.user == 'admin' && bcrypt.compareSync(  params.verify_code + superusers[params.user],  params.password)){
                this.session.cookie.maxage = 1000 * 3600 * 24 * 7;
                this.session.login = true;
                this.session.name = params.user;
                this.session.username = '超级管理员';
                this.body = {
                    login: true
                };
            }else{
                throw new Error('账号或密码不正确')
            }
        }


    },

    logout: function*(){
        session.setLogout.call(this);
        this.redirect("/login");
    },

    getCaptcha: function *(){
        var item = yield captcha({
            length: 4, //code length
            fontSize: 30, //code size
            width: 150, // captcha width
            height: 32, // captcha height
            color: 'green', // code color,
            background: 'rgb(245,245,245)', // captcha background color
            lineWidth: 0.5, // Interference lines width
            type: 'number'
        });
        this.session && (this.session.captcha = item.answer);
        this.body = item.imageBuffer
    },

    checkAuthCode: function *(){
        var params = this.request.body;
        if(params.authcode == this.session.authcode){
            this.body = {
                result: true
            }
        }else{
            this.body = {
                result: false
            }
        }
    },


    upload: function*(){

        var parts = parse(this,{autoFields: true}); //将文件对象解析成可读流
        var part;
        var fileData;
        var fileName;
        while(part = yield parts){
            fileName =  part.filename;

            //方法一: 上传到临时文件再读取并处理
            //yield uploader.uploadFile(part, fs.createWriteStream('tmp/' + part.filename));           //上传
            //fileData = yield uploader.processExcelFile( path.join(__dirname,'../tmp', fileName) );   //读取excel文件

            //方法二: 内存中处理
            fileData = yield uploader.processExcelFile( yield uploader.uploadFileToBuffer(part) );

        }

        this.body = {
            success: true,
            msg: fileData
        };
    },


    api: function*(){
          this.body = this.session;
    },


    checkLogin: function*(next){

        if(this.session.login){
            yield next;
        }else{
            this.redirect("/login");
            this.status = 301;
        }
    },

}