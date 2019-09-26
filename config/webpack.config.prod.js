const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const TerserPlugin = require('terser-webpack-plugin');

const config = webpackMerge(baseConfig, {
    devtool: 'eval-source-map',
    mode: 'production',
    stats: {
        children: false,
        warnings: false
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true
                }
            }
        }
    },
})

module.exports = config