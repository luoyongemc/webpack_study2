/**
 *
 * 所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
 */

//resolve用来拼接绝对路径的方法
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "./js/built.js",
    //__dirname nodejs的变量，代表当前文件的目录的绝对路径
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      
    ],
  },
  
  plugins: [
    //详细plugins的配置
    //默认会创建一个空的html，自动引入打包输出的所有资源（jss css）
    new HtmlWebpackPlugin({
      //复制'./src/index.html'文件，并引入打包输出的所有资源
      template: "./src/index.html",
    }),
  ],
  //模式
  mode: "production",
  externals:{
    //忽略库名 -- npm 包名  拒绝jQuery被打包进来
    jquery:'jQuery'
  }
};
