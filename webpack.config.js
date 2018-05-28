'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const webpackHotMiddleware = require('webpack-hot-middleware');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const path = require('path');
const merge = require('webpack-merge');

const webpackCommon = {
    entry: [
        './src/initialize',
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader?presets[]=es2015'
            }]
        },
            {
                test: /\.jst$/,
                use: {
                    loader: 'underscore-template-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                })),
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=10000',
            },
        ]
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'src/assets/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            _: 'underscore',
            bootstrap: 'bootstrap'
        }),
        new ExtractTextPlugin('application.css'),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    resolve: {
        modules: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './app')
        ]
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, './node_modules')
        ]
    },
};
switch (process.env.npm_lifecycle_event) {
    case 'start':
    case 'dev':
        console.log('Running webpack in development mode');
        module.exports = merge(webpackCommon, {
            entry: ['webpack/hot/dev-server'],
            devtool: '#inline-source-map',
            devServer: {
                contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
                compress: true,
		port: 8080,
                proxy: [{
                    context: [
                        "/",
                        "/devices",
                        "/devices/viewgroups",
                        "/statuses",
                        "/svc/events",
                        "/svc/sources",
                        "/svc/update",
                        "/controllers/equipment",
                        "/errors",
                        "/camerastream",
                        "/controller",
                        "/journal",
                        "/journal/danger",
                        "/analitics",
                        "/to",
                        "/to/servicejournal",
                        "/login",
                        "/login/users",
                        "/config",
                        "/config/locale",
                        "/values"
                    ],
                    target: "http://localhost:3001",
                }]
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
            ]
        });
        break;
    default:
        console.log('Running webpack in production environment')
        module.exports = merge(webpackCommon, {
            devtool: 'cheap-module-source-map',
            plugins: [
                new UglifyJSPlugin(),
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
                new PreloadWebpackPlugin({
                    rel: 'preload',
                    as: 'script',
                    include: 'all',
                    fileBlacklist: [/\.(css|map)$/, /base?.+/]
                }),
                new CompressionPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                    threshold: 10240,
                    minRatio: 0.8
                })
            ]
        });
        break;
}
