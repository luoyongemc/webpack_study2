/**
 * npx webpack
 * npx webpack-dev-server
 * 
 * 
 */

 const { resolve } = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const ESLintPlugin = require('eslint-webpack-plugin');
 
 module.exports = {
   entry: "./src/js/index.js",
   output: {
     filename: "js/built.js",
     path: resolve(__dirname, "build"),
   },
   module: {
     rules: [
       /**
        * 语法检查：eslint-loader eslint
        *   注意：只检查自己写的源代码，第三方库是不用检查的
        * 设置检查规则：
        *   packag.json中eslintConfig中设置
        *   airbnb --> eslint-config-airbnb-base   eslint   eslint-plugin-import
        * 
        * "eslintConfig":{
            "extends":"airbnb-base"
        }
        */
    //    {
    //        test:/\.js$/,
    //        exclude:/node_modules/,
    //        loader:'eslint-loader',
    //        options:{}
    //    }
     ],
   },
   plugins: [
     new HtmlWebpackPlugin({
       template: "./src/index.html",
     }),
     new ESLintPlugin({
        fix: true, // 启用ESLint自动修复功能
        extensions: ['js', 'jsx'],
        // context: resolve('src'), // 文件根目录
        exclude: '/node_modules/',// 指定要排除的文件/目录
        // cache: true //缓存
    })
     
   ],
   mode: "development",
 };
 