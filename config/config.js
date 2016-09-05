//应用配置文件
var path = require('path');
var local = require('./local');
var _ = require('underscore');
var config = {
    "title":"Admin",
    //默认生产环境
    "env":"production",
    "appName": "应用测试后台",
    //端口号配置
    "port": 3000,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": path.join(__dirname,'..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'..', 'public'),


    superadmin: 'admin',
    password: '123456',
    mongo: "mongodb://localhost/dayu_center",

};

var fs = require('fs')
fs.exists(config.logDir, function (exists) {
    if(!exists){
        fs.mkdir(config.logDir)
    }
});

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = _.extend(config,local);
}

module.exports = config;