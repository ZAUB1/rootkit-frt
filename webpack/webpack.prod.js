const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const { prod_Path, src_Path } = require("./path");
const { selectedPreprocessor } = require("./loader");

module.exports = {
    entry: {
        main: "./" + src_Path + "/index.ts"
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.html']
    },
    output: {
        path: path.resolve(__dirname, prod_Path),
        filename: "[name].[chunkhash].js"
    },
    //devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(ts|tsx)?$/,
            use: 'ts-loader',
            exclude: /node_modules/
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
        new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
            root: process.cwd()
        }),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./" + src_Path + "/index.html",
            filename: "index.html"
        }),
        new WebpackMd5Hash()
    ]
};
