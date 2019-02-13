'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const path = require('path');
const merge = require('webpack-merge');

const webpackCommon = {
  entry: [
    path.resolve(__dirname, './index.js'),
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
        },
      }],
    },
    {
      test: /\.jst$/,
      use: {
        loader: 'underscore-template-loader',
      },
    },
    {
      test: /\.(css|scss)$/,
      use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      })),
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=10000',
    },
    ],
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, 'src/assets/index.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'underscore',
      bootstrap: 'bootstrap',
    }),
    new ExtractTextPlugin('application.css'),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

};
switch (process.env.npm_lifecycle_event) {
  case 'start':
  case 'dev':
    console.log('Running webpack in development mode');
    module.exports = merge(webpackCommon, {
      devtool: 'cheap-module-eval-source-map',
    });
    break;
  default:
    console.log('Running webpack in production environment');
    module.exports = merge(webpackCommon, {
      devtool: false,
      plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new PreloadWebpackPlugin({
          rel: 'preload',
          as: 'script',
          include: 'all',
          fileBlacklist: [/\.(css|map)$/, /base?.+/],
        }),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      ],
    });
    break;
}
