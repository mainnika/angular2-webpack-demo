var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        vendor: './client/vendor.ts',
        app: './client/app.ts',
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
    },

    output: {
        path: './dist',
        filename: 'js/[name].js',
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?postcss!sass'),
                exclude: /client\/(?!(style))/,
            },
            {
                test: /\.scss$/,
                loader: 'raw!postcss!sass',
                exclude: /client\/style/,
            },

            { test: /\.jade$/, loader: 'jade' },
            { test: /\.html$/, loader: 'raw' },
        ],
    },

    externals: {
        "jquery": "jQuery",
        "core-js": true,
        "zone.js": true,
        "reflect-metadata": true,
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            template: './client/index.jade',
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([{
            from: './client/static'
        }]),
        new ExtractTextPlugin('css/[name].css'),
    ],

    postcss: [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ],
}