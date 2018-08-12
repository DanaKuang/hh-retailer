// 专门打包第三方文件，会生成一个map，映射关系

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        vue: ['vue-router', 'vue'],
        lodash: ['lodash'],
        axios: ['axios']
    },
    output: {
        path: path.join(__dirname, './src/dll'),
        filename: '[name].dll.js',
        library: '[name]',
        // publicPath: '/retailer-hehua/'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '/src/dll', '[name]-manifest.json'),
            name: '[name]'
        })
    ],
    // optimization: {
    //     minimizer: [
    //         new UglifyJSPlugin({
    //             cache: true,
    //             parallel: true
    //         })
    //     ]
    // }
}