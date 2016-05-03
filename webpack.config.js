var webpack = require('webpack');
var path = require('path');
var NodeModules =  path.resolve(__dirname, "./node_modules");
var config = {
    //devtool: "source-map",
    entry: {
        index: ['./src/index.jsx'],
        login: ['./src/login.jsx'],
    },
    output: {
        publicPath: "/assets/",
        path: path.join(__dirname, '/public/assets'),
        filename: '[name].js',
    },
    resolve: {
        extensions:['','.js','.json','.jsx','.css','.es6','.scss','.png','.jpg','.jpeg'],
        alias: {
            'react-dom':  path.join(NodeModules,   "/react-dom/dist/react-dom"),
            'antd':  path.join(NodeModules,   "/antd"),
            'normalize':  path.join(NodeModules,   "/normalize.css"),
            'history':  path.join(NodeModules,   "/history"),
        }
    },
    module: {
        noParse: [
            path.join(NodeModules, "/react/dist/react"),
        ],
        //{
        //    test: /\.jsx?$/,
        //    loader: 'es3ify',
        //},
        loaders:[
            {
                test : /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
                query:{
                    "presets": ["es2015", "react", "stage-0"],
                    "plugins":[
                        "transform-decorators-legacy",
                        //"transform-es2015-modules-commonjs",
                        "add-module-exports"]
                }
                //loaders: ['react-hot','babel?presets[]=es2015&presets[]=react&presets[]=stage-0&plugins[]=transform-decorators-legacy']
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            { test: /\.css$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]' },
            { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
            { test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' }
        ]
    },
    externals: {
        //'react': 'React',
        //'react-dom': 'ReactDOM',
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

        new webpack.ProvidePlugin({
            //$: "jquery",
            //jQuery: "jquery",
            //"window.jQuery": "jquery",
            "React": "react",
            "ReactDOM": "react-dom",
        }),
        //new webpack.DefinePlugin({
        //    'process.env.NODE_ENV': '"production"'
        //}),
        new webpack.optimize.OccurenceOrderPlugin(),

        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //}),
        new webpack.NoErrorsPlugin()

    ]
};

module.exports = config;

