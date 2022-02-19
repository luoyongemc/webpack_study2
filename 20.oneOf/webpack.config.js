/**
 * 缓存：
 *  babel缓存：
 *    cacheDirectory:true    ---->让第二次打包构建速度更快
 *  文件资源缓存：
 *    hash：每次webpack构建时会生成一个唯一的hash值
 *      问题：因为js和css同时使用一个hash值
 *            如果重新打包，会导致所有缓存失败（可我却只改动了一个文件）
 *    chunkhash:根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
 * 
 *      问题：css和js的hash值还是一样的  因为css是在js中被引入的，所以同属于一个chunk
 *    contenthash:根据文件的内容生成hash值，不同文件hash值一定不一样
 *    ----->让代码上线运行缓存更好使用
 */


const {resolve} = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


process.env.NODE_ENV = 'production';

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader:'postcss-loader',
        options:{
            postcssOptions: {
            plugins: ['postcss-preset-env']
        }
        }
    }
]

module.exports ={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.[contenthash:10].js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            /**
             * 正常来讲，一个文件只能被一个loader处理，
             * 当一个文件被多个loader处理，那么一定要指定loader执行的先后顺序
             */
            {
                test:/\.css$/,
                use:[...commonCssLoader]
            },
            {
                test:/\.less$/,
                use:[
                    ...commonCssLoader,
                    'less-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                  //预设：指示babel做怎么样的兼容性处理
                  presets:[
                    [
                     '@babel/preset-env',
                     {
                       //按需加载
                       useBuiltIns:'usage',
                       //指定core-js版本
                       corejs:{
                         version:3
                       },
                       //指定兼容性做到哪个版本浏览器
                       targets: {
                         chrome:'60',
                         firefox:'60',
                         ie:'9',
                         safari:'10',
                         edge:'17'
                       }
                     }
                    ]
                  ],
                  //开启babel缓存
                  //第二次构建时，会读取之前的缓存
                  cacheDirectory:true
                }
            },
            {
                //处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader",
                type: "javascript/auto",
                options: {
                  limit: 8 * 1024,
                  name: "[hash:10].[ext]",
                  esModule: false,
                  outputPath: "imgs",
                },
            },
            {
                //处理html中img资源
                test: /\.html$/,
                loader: "html-withimg-loader",
                options: {
                  esModule: false,
                },
              },
              {
                //处理其它资源
                exclude: /\.(html|css|js|less|jpg|png|gif)/,
                loader: "file-loader",
                options: {
                  //解决:关闭url-loader的es6模块化，使用commonjs解析
                  esModule: false,
                  name: "[hash:10].[ext]",
                  outputPath: "media",
                },
                type: "javascript/auto",
              },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify:{
                //移除空格
                collapseWhitespace:true,
                //移除注释
                removeComments:true
              }
          }),
        new MiniCssExtractPlugin({
            filename:'css/built.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new ESLintPlugin({
            fix: true, // 启用ESLint自动修复功能
            extensions: ['js', 'jsx'],
            // context: resolve('src'), // 文件根目录
            exclude: '/node_modules/',// 指定要排除的文件/目录
            // cache: true //缓存
        })
    ],
    mode:'production',
    devtool:'source-map'
}