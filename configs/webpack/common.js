const paths = require('../paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: paths.src,
    entry: './index.js',
    output: {
        filename: 'bundle.min.js',
        path: paths.build,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            corejs : {
                                version : "3",
                                proposals : true
                            },
                            useBuiltIns: 'usage',
                            targets: {
                                browsers: [
                                    "last 2 version",
                                    "ie >= 11"
                                ]
                            }
                        }]]
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
    ]
};
