
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
                exclude: /node_modules\/(?!(ng2-.+))/
            },
            { test: /\.html$/, loader: 'raw' },
        ],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/],
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            template: './client/static/index.html',
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([{
            from: './client/static'
        }])
    ]
}
