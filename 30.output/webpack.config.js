/**
 *  
 *  
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: "./src/js/index.js",
  output: {
    //指定名称（指定名称+目录）
    filename: "./js/[name].js",
    //输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, "build"),
    //所有资源引入公共路径前缀  --> 'img/a.jpg'  --> '/img/a.jpg'
    publicPath:'/',
    chunkFilename:'[name]_chunk.js',//非入口chunk的名称  import导入的文件
    //library:'[name]',//整个库向外暴露的变量名
    //libraryTarget:'window' //变量名添加到哪个上  browser
    //libraryTarget:'global' //变量名添加到哪个上  node
    //libraryTarget:'commonjs' //变量名添加到哪个上  n

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    })
  ],
  //模式
  mode: "development",
};
