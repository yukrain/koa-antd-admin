//var User     = require( './../model/user' );

var session = require('./session');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var path = require('path');
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
        this.redirect("/app?_="+Math.random());
    },

    login: function*(){
        var params  = this.request.body;
        console.log(params)
        if(params.user == 'admin' && bcrypt.compareSync(  params.verify_code + superusers[params.user],  params.password)){
            console.log('login')
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
    },

    logout: function*(){
        session.setLogout.call(this);
        this.redirect("/login?_="+Math.random());
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