/*
* 后台 koa
* 路由 koa-router
* 前端 react redux react-router
* 打包 webpack babel编译
* */

var debug = require('debug')('yuk-admin');
var koa = require('koa');
var gzip = require('koa-gzip');
var heapdump = require('heapdump');
heapdump.writeSnapshot(__dirname +'/heap/' + Date.now() + '.heapsnapshot');

var favicon = require('koa-favicon');

//配置文件
var config = require('./config/config');

var app = koa();
app.keys = ['keys', 'keykeys'];


app.use(gzip());

app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});


app.use(favicon(__dirname + '/public/favicon.png'));

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;


var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
    //配置模板目录
    views: config.viewDir
});

//session中间件
var session = require('koa-generic-session');

var MongoStore = require('koa-sess-mongo-store');
var sessionConfig = {
    store: new MongoStore({
        db: 'game_admin'
    }),
    prefix: 'yuk-admin:sess:',
    key: 'yuk-admin.sid',
    beforeSave: function(ctx, sess){
        ctx.session.cookie.maxAge = sess.cookie.maxage; //兼容 maxAge
    }
};

app.use(session(sessionConfig));


//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());

//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(function*(next){

    this.state.debug = config.debug;
    yield next;
});


app.use(staticCache(staticDir,{
    maxAge: 365 * 24 * 60 * 60
}));

//app.use(staticCache(staticDir+'/js'));
//app.use(staticCache(staticDir+'/css'));

//控制台访问日志
if(config.debug){
    var koaLogger = require('koa-logger');
    app.use(koaLogger());
}


//路由
var router = require('koa-router');

//统一处理默认Error
app.use(function *(next) {
    yield next;
    //try {
    //    yield next;
    //} catch (err) {
    //    console.log(err);
    //    //logger.error(err);
    //    this.status = err.status || 500;
    //    this.body = {
    //        name: "Error",
    //        code: err.status || 500,
    //        message: err.message || "服务器错误",
    //        success: false
    //    };
    //        //this.app.emit('error', err, this);
    //
    //}
});

//处理404
app.use(function *(next) {
    yield next;

    if( this.status == 404){
        this.body = { name: "PageNotFound"};
    }
});

//应用路由
var appRouter = require('./router/index');
appRouter(app, router);


//部署模式发送错误
if (process.env.NODE_ENV == 'pruduction') {
    app.on('error', function(err){
            console.log('sent error %s to the cloud', err.message);
            console.log(err);
            logger.error(err);
    });
}


//var os = require('os');
//var showMem = function(){
//    var mem = process.memoryUsage();
//    var format = function(bytes){
//        return (bytes/1024/1024).toFixed(2) + 'MB';
//    }
//    console.log('Process: heapTotal ' + format(mem.heapTotal) +
//    ' heapUsed '+ format(mem.heapUsed) +
//    ' rss '+ format(mem.rss));
//    //console.log('总内存: '+ format(os.totalmem()) +
//    //' 空闲' + format(os.freemem()))
//};
//setInterval(showMem, 1000);

app.listen(config.port);
console.log('listening on port %s',config.port);

module.exports = app;

