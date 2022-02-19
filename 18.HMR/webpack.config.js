/**
 * npx webpack
 * npx webpack-dev-server
 * 
 * HRM:hot module replacement 热模块替换
 *  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）  极大提升构建速度
 * 
 *  样式文件：可以使用HRM功能，因为style-loader内部实现了
 *  js文件：默认不能使用HRM功能 --->需要修改js代码，添加支持HMR功能的代码
 *    *HMR功能对js的处理，只能处理非入口js文件的其它文件
 *  html文件：默认不能使用HRM功能，同事会导致问题：html文件不能热更新  (只有一个html文件，不用做HRM功能)
 *    *解决：修改entry入口，将html文件引入
 * 
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js","./src/index.html"],
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      //loader的配置
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  devServer: {
    compress: true,
    port: 3000,
    open: true,
    watchFiles: ["./src/index.html"],
    //开启HRM功能 当修改了webpack配置，新配置要想生效，必须重启服务
    hot:true
  },
};
