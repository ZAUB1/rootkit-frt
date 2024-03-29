const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
    prod_Path,
    src_Path
} = require('./path');

const {
    selectedPreprocessor
} = require('./loader');

module.exports = {
    entry: {
        main: './' + src_Path + '/index.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', ".html", ".scss"],
        alias: {
            "&": path.resolve("./src")
        }
    },
    output: {
        path: path.resolve(__dirname, prod_Path),
        filename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)?$/,
            use: 'ts-loader',
            exclude: [ /node_modules/ ]
        }, {
            test: selectedPreprocessor.fileRegexp,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: selectedPreprocessor.loaderName,
                    options: {
                        sourceMap: true
                    }
                },
            ]
        }, {
            test: /\.svg?$/,
            use: [{
                loader: "svg-url-loader",
                options: {
                    limit: 10000
                }
            }]
        }, {
            test: /\.html$/i,
            loader: 'raw-loader',
            exclude: /index.html/
        }, {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './' + src_Path + '/index.html',
            filename: 'index.html'
        })
    ]
};