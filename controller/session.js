/**
 * Created by YUK on 16/4/6.
 */


module.exports = {

    setLogin : function(){
        this.session.cookie.maxage = 1000 * 3600 * 24 * 7;
        this.session.login = true;
    },

    resetAuthCode : function(authcode){
        this.session.authcode = authcode;
    },

    setRememberMe : function(){
        this.session.cookie.maxage = 1000 * 3600 * 24 * 30;
    },

    setLogout : function(){
        this.session = null;
    },

    regenerate : function*(){
        yield this.regenerateSession();
    },

     get: function(){
         var session = this.session;
         session.count = session.count || 0;
         session.count++;

     },

    remove: function*() {
        this.session = null;
        this.body = 0;
    }
}