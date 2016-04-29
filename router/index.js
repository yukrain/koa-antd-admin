var controller = require('../controller/index');

module.exports = function(app, Router){

    var router = new Router();

    router.get('/captcha', controller.getCaptcha);

    //登陆
    router.get('/login', controller.loginRender);
    router.post('/login', controller.login);
    router.get('/logout', controller.logout);

    //验证接口权限
    router.use(controller.checkLogin);

    router.get('/',controller.index);

    router.get('/api',controller.api);
    router.get('/*',controller.index);

    app.use(router.routes());
}