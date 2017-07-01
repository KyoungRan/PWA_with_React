'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin-loader');

module.exports = {
    entry: {
        main: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loaders: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                context: './public',
                from: '*.*'
            }
        ]),
        new SWPrecacheWebpackPlugin({
            staticFileGlobs: [
                path.join(path.resolve(__dirname, './build'), '**/*')
            ],
            logger: function() {},
            filename: 'sw.js'
        })
    ],
    devServer: {
        contentBase: './public',
        host: 'localhost',
        port: 8080
    }
};
