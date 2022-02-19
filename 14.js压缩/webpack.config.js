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
   
   plugins: [
     new HtmlWebpackPlugin({
       template: "./src/index.html",
       //压缩html的配置
       minify:{
         //移除空格
         collapseWhitespace:true,
         //移除注释
         removeComments:true
       }
     }),
    
     
   ],
   //生产环境下会自动压缩代码
   mode: "production",
 };
 