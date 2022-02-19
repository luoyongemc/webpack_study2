/**
 *
 * 所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
 */

//resolve用来拼接绝对路径的方法
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    //__dirname nodejs的变量，代表当前文件的目录的绝对路径
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      //详细loader配置
      {
        //匹配哪些文件
        test: /\.css$/,
        //使用哪些loader进行处理
        use: [
          //use数组中loader执行顺序：从右到左，从下到上
          //创建style标签，将js中的样式资源插入进行，添加到header中进行生效
          "style-loader",
          //将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
        ],
      },
      {
        //匹配哪些文件
        test: /\.less$/,
        //使用哪些loader进行处理
        use: [
          //use数组中loader执行顺序：从右到左，从下到上
          //创建style标签，将js中的样式资源插入进行，添加到header中进行生效
          "style-loader",
          //将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
          "less-loader",
        ],
      },
      {
        //匹配哪些文件
        test: /\.(jpg|png|gif)$/,
        //使用哪些loader进行处理
        loader: "url-loader",
        type: "javascript/auto",
        options: {
          //图片大小小于8kb，就会被base64处理
          limit: 8 * 1024,
          //url-loader默认使用es6模块化解析，而html-loder引入图片是commonjs 需要将esModule关闭
          esModule: false,
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        /**
         * html-loader可以处理html中的img图片，可负责将其中的图片引入，然后交由url-loader进行解析
         */

        loader: "html-withimg-loader",
        options: {
          esModule: false,
        },
      },
      {
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
      },
    ],
  },
  //plugins的配置
  plugins: [
    //详细plugins的配置
    //默认会创建一个空的html，自动引入打包输出的所有资源（jss css）
    new HtmlWebpackPlugin({
      //复制'./src/index.html'文件，并引入打包输出的所有资源
      template: "./src/index.html",
    }),
  ],
  //模式
  mode: "development",
  //开发服务器devServer:用来自动化（自动编译  自动打开浏览器 自动刷新浏览器）
  //只会在内存种编译打包，不会有任何输出  webpack-dev-server
  devServer: {
    // contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    watchFiles: ["./src/index.html"],
    open: true,
  },
};
