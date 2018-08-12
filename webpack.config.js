// 核心
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

// 辅助
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 环境
const ENV_MODE = process.env.NODE_ENV;

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    mode: ENV_MODE,
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[chunkhash:5].js',
        publicPath: '/retailer-hehua/',
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    optimization: {
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        minimizer: [ //指定压缩器
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        runtimeChunk: {
            name: "manifest"
        },
		splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
			cacheGroups: {
				default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true
                },
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendor',
					priority: -10,
					enforce: true
                }
			}
		}
    },
    devServer: {
        port: '1234',
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        // proxy: {
        //     '/retailer': {
        //         target: 'http://cs-hehua.saotianxia.vip',
        //         changeOrigin: true,
        //         logLevel: 'debug'
        //     }
        // },
        publicPath: '/',
        open: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                include: resolve('src')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    ENV_MODE === 'development'
                        ? {
                            loader: 'vue-style-loader'
                        }
                        : {
                           loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: ['iOS >= 7', 'Android >= 4.1']
                                    }),
                                    require('postcss-pxtorem')({
                                        rootValue: 75,
                                        baseDpr: 2,
                                        unitPrecision: 5,
                                        propList: ['*'],
                                        selectorBlackList: [],
                                        replace: true,
                                        mediaQuery: false,
                                        minPixelValue: 12
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                ],
                include: resolve('src')
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-80',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components')
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].map'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: ENV_MODE === 'development' ? '[name].css' : '[name].[hash:5].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
            }
        }),
        new webpack.ProvidePlugin({
            axios: 'axios',
            _: 'lodash'
		}),
        new CleanWebpackPlugin(['dist', 'zip']),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 40240,
            minRatio: 0.6
        })
    ]
}