const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: 'bundle-[hash].js'
    },
    module: {
        rules: [
            /*{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                }
            },*/
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '..', 'src'),
                use: [
                    { loader: 'babel-loader' }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
};
