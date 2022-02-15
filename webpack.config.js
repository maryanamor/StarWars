const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: `./js/${fileName('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: ""
    },
    devServer: {
        // set up webpack dev server to update js file on save
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'app')
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./styles/${fileName('css')}`
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, './assets'), to: path.resolve(__dirname, 'app') }
            ]
        })
    ],
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader", // update html file on save
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // update css file on save
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            // {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 ['@babel/preset-env', { targets: "defaults" }]
            //             ],
            //             plugins: ['@babel/plugin-proposal-class-properties']
            //         }
            //     }
            }
        ]
    }
};
