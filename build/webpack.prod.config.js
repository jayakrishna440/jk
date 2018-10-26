const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackbaseconfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 独立打包css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
module.exports = merge(webpackbaseconfig, {
    mode: 'production',
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]-[hash].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                ENV: '"production"'
            }
        })
    ]
});
