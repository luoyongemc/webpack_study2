/**
 * tree shaking:去除无用代码
 *    前提：1.必须使用ES6模块化   2.开启production环境
 * 
 *  在package.json中配置
 *    "sideEffects":false  所有代码都没有副作用（都可以进行tree shaking）
 * 
 *    问题：可能会把css / @babel/polyfill  （副作用）给干掉
 *    "sideEffects":["*.css"]
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