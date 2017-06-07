var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var EjsBuilderPlugin = require('ejs-webpack-builder');

var packageJson = require('./package.json');
var env = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname + '/typescript/src',
    entry: {
        content: "./content.ts"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/build"
    },
    devtool: env === "production" ? false : "eval",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    __dirname + "/typescript/src/"
                ],
                use: ["awesome-typescript-loader"]
            },
            {
                enforce: "pre",
                test: /\.tsx?$/,
                include: [
                    __dirname + "/typescript/"
                ],
                use: ["tslint-loader"]
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    __dirname + "/assets/styles/"
                ],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + env + '"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: (env === 'production'),
            sourceMap: false,
            compile: {
                warnings: false
            }
        }),
        new EjsBuilderPlugin({
            root:__dirname,
            files:[
                {
                    source: {
                        name: 'manifest.ejs',
                        dir: './assets'
                    },
                    target: {
                        name: 'manifest.json',
                        dir: './'
                    },
                    parameters: {
                        name: packageJson.displayName,
                        description: packageJson.description,
                        version: packageJson.version
                    },
                    encoding: 'utf8'
                }
            ]
        })
    ]
};