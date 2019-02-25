const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool:'source-map',
    mode: "production",
    entry: {
        bundle: "./src/index.js"
    },
    output:{
        path: path.resolve(__dirname, "bundle"),
        filename : "[name].[chunkhash].js",
        publicPath: 'bundle/',
    },
    module: {
        rules : [
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/,
            },
            {
                test:/\.scss$/,
                use : [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options:{ sourceMap: true, } },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader', },
                ],
            },
        ],
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"css/all.css",
            chunkFilename:"css/[id].css"
        }),
        new HtmlWebpackPlugin({
            template:'public/index.html', // use this file as a template
            filename:'index.html' // output location
        }),
        new CleanWebpackPlugin('bundle/*.*')
    ],
    optimization : {
        splitChunks : {
            cacheGroups : {
                vendor: {
                    test:/node_modules/,
                    name:'vendors',
                    chunks:'all'
                }
            }
        }
    }
}
