const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')

const config = {
    target: 'node',
    entry: {
        server: path.join(__dirname, '../app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, '../dist')
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: [path.join(__dirname, './node_modules')]
        }]
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin(),
        // 新增
        // 创建process.env常量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') ? "'production'" : "'development'"
            }
        })
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true
    }
}

module.exports = config