//var User     = require( './../model/user' );

var session = require('./session');
var bcrypt = require('bcryptjs');
var captcha = require('./captcha');
var fs = require('fs');
var path = require('path');

var users = {
    "admin": "e10adc3949ba59abbe56e057f20f883e" //md5一次以后的密码 admin 123456 暂时
};

module.exports = {
    index: function*(){
        if(this.session.login){
            yield this.render('index',{"title":"后台", state: this.state});
        }else{
            this.redirect("/login");
        }
    },
    loginRender: function*(){

        this.session.verify_code =  Math.random().toString(36).slice(2);
        yield this.render('login',{"title":"登陆", verify_code: this.session.verify_code, state: this.state});
    },

    login: function*(){
        var params  = this.request.body;
        if(params.captcha.toString().toLocaleUpperCase() !== this.session.captcha.toString()){
            this.body = {
                login: false,
                msg: '验证码错误'
            };
        }else if(params.username in users && bcrypt.compareSync(  this.session.verify_code + users[params.username] ,  params.password) ){
            session.setLogin.call(this);

            if(params.agreement){
                session.setRememberMe.call(this);
            }

            this.cookies.set('login', 'admin');

            this.body = {
                login: true
            };
        }else{
            this.body = {
                login: false,
                msg: '用户名或密码错误'
            };

        }

    },

    logout: function*(){
        session.setLogout.call(this);
        this.redirect("/login");
    },

    getCaptcha: function *(){
        this.type = 'jpg';
        this.set({
            'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
            'Expires': 'Sun, 12 Jan 1986 12:00:00 GMT'
        });
        //生成验证码 返回text和图buffer
        var data = yield captcha({
            length: 4, //code length
            fontSize: 30, //code size
            width: 150, // captcha width
            height: 32, // captcha height
            color: 'green', // code color,
            background: 'rgb(245,245,245)', // captcha background color
            lineWidth: 0.5, // Interference lines width
            type : 'arithmetic'
        });
        this.session && (this.session.captcha = data[0])
        this.body = data[1]
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


    api: function*(){
          this.body = this.session;
    },


    checkLogin: function*(next){
        yield next;
        //if(this.session.count >= 0){
        //    console.log('redirect /');
        //    this.redirect("/login");
        //}else{
        //    console.log('redirect /login');
        //
        //    this.redirect("/login");
        //}
    }
}