const webpack = require('webpack');
var entryPath = __dirname + '\\application\\frontend';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: entryPath ,
    entry: {
        home: './home',
        about:'./about'
    },

    output: {
        path: 'application/public',
        filename: "[name].js",
        library: '[name]',
        publicPath: '/'
    },
    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? null : "source-map",

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
            }
        )
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            include: __dirname + '/application/frontend',
            loader: 'babel?presets[]=es2015',
        }],

        noParse: [
            /react\/react.js/,
            /react-dom\/dist\/*.js/,
        ]

    },

    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js"]
    },

    resolveLoader: {
        modulesDirectories: ["node_modules"],
        moduleTemplates: ["*", "*-loader", "*-core" ],
        extensions: ["", ".js"]
    }
};

if (NODE_ENV == 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}


console.log(NODE_ENV);