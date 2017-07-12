'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const production = process.env.NODE_ENV === 'production';
const devtool = production
    ? 'cheap-module-source-map'
    : 'cheap-module-eval-source-map';
const chunkFilename = production ? '[name].[chunkhash].js' : '[name].js';
const webpackPlugins = production
    ? [
          new webpack.optimize.UglifyJsPlugin({
              // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
              sourceMap: devtool,
              mangle: true,
              beautify: false,
              comments: false,
              // http://lisperator.net/uglifyjs/compress
              compress: {
                  unused: true,
                  dead_code: true,
                  warnings: false,
                  drop_debugger: true,
                  conditionals: true,
                  evaluate: true,
                  drop_console: true,
                  sequences: true,
                  booleans: true
              },
              extractComments: true
          }),
          new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false
          })
      ]
    : [];

const htmlMinify = production
    ? {
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
      }
    : {};

module.exports = {
    entry: {
        main: ['./src/main.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: chunkFilename,
        chunkFilename: chunkFilename
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
    devtool,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'common',
            minChunks: 2
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            minify: htmlMinify
        }),
        new PreloadWebpackPlugin({
            include: ['common', 'home']
        }),
        new PreloadWebpackPlugin({
            rel: 'prefetch',
            include: ['users', 'notification']
        }),
        new CopyWebpackPlugin([
            {
                context: './public',
                from: '*.*'
            },
            {
                from: './src/firebase-messaging-sw.js',
                to: 'firebase-messaging-sw.js'
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
