const { merge } = require('webpack-merge');
const common = require('./common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssnanoPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
});
