var webpack = require('webpack');
var config = require("./webpack.config.js");


config.output.publicPath = 'http://gm2.pokemon.dayugame.net/assets/';
//config.devtool = 'cheap-module-source-map';

config.plugins = [
    //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),


    new webpack.ProvidePlugin({
        "React": "react",
        "ReactDOM": "react-dom",
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),


    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.NoErrorsPlugin()

]


module.exports = config;
