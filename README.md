### 手动搭建基于vue的webpack配置 --主要基于生产配置
1. 安装vue-loader之后，webpack仍然无法自动编译vue文件。需要在webpack.config.js中配置const { VueLoaderPlugin } = require('vue-loader'),然后在plugins中设置new VueLoaderPlugin()。
2. 至此npm run build 和 npm run dev成功，config的配置如下
```
const ENV_MODE = process.env.NODE_ENV;
module.exports = {
    mode: ENV_MODE,
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        port: '1234',
        contentBase: './dist',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            'scss': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            title:'retailer',
            template:'./index.html',
        })
    ]
}
3. 使用vue-router，注意在main.js里面import router from './router'，前面import一定是小写的router，大写的Router会报错。因为模块也叫Router.
4. proxy
5. 如何设置px2rem，并了解其原理
6. 打包后只生成一个app.bundle.js，文件过大，有300+k；style都放在head标签内，要用link引入


2018.08.10
在entry中配置context，这样操作入口的根目录变了，htmlwebpackplugin插件中的tempalte:"./index.html"就要变成template:"../index.html"，因为配置了context把操作入口放在src目录下了
context的配置，要用path.resolve(__dirname, 'src'),entry: {app: './main.js'}

