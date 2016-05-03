var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");


config.output.publicPath = 'http://localhost:8081/assets/';


config.entry.index.unshift("webpack/hot/only-dev-server");
config.entry.index.unshift("webpack-dev-server/client?http://localhost:8081");  // 将执替换js内联进去

config.entry.login.unshift("webpack/hot/only-dev-server");
config.entry.login.unshift("webpack-dev-server/client?http://localhost:8081");  // 将执替换js内联进去

config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.devtool = 'eval';

config.module.loaders[0].query.presets.push("react-hmre");
config.module.loaders[0].query.plugins.push([
    'react-transform', {
        transforms: [{
            transform : 'react-transform-hmr',
            imports   : ['react'],
            locals    : ['module']
        }]
    }
]);


var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: '/assets/',
    hot: true,
    //historyApiFallback: true,
    stats: {
        colors: true  // 用颜色标识
    },
});
server.listen(8081);