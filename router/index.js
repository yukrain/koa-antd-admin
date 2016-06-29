var controller = require('../controller/index');

module.exports = function(app, Router){

    var router = new Router();

    router.get('/captcha', controller.getCaptcha);

    //登陆
    router.get('/login', controller.loginRender);
    router.post('/login', controller.login);
    router.get('/logout', controller.logout);


    router.use('/api', controller.checkLogin);
    router.get('/api',controller.api);


    router.use('/app', controller.checkLogin);
    router.get('/app',controller.index);
    router.get('/app/*',controller.index);
    router.get('/*',controller.redirectIndex);


    app.use(router.routes());
}