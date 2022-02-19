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
  devtool:'source-map'
};

/**
 * source-map:一种 提供源代码到构建后代码映射 技术  （如果构建后代码出错了，通过映射可以追踪源代码错误）
 * 
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]] source-map
 * 
 * source-map(外部)
 *  *错误代码准确信息 和源代码的错误位置
 * inline-source-map（内联：只生成一个内联source-map）  内联 和 外联 区别：1.外部生成了文件，内联没有  2.内联构建速度更快
 *  *错误代码准确信息 和源代码的错误位置
 * hidden-source-map(外联)
 *  *错误代码错误原因 但是没有错误位置 不能追踪源代码错误，只能提示到构建后代码的错误位置
 * eval-source-map（内联：每一个文件都生成对应的source-map,都在eval）
 *  *错误代码准确信息 和源代码的错误位置
 * 
 * nosources-source-map(外联)
 *  *错误代码准确信息，但是没有任何源代码信息
 * cheap-source-map（外联）
 *  *错误代码准确信息 和源代码的错误位置 只能精确到行
 * cheap-module-source-map
 *  *错误代码准确信息 和源代码的错误位置
 *  module会将loader的source map加入
 * 
 * 开发环境：速度快  调试更友好   eval-source-map
 * 速度快（eval>inline>cheap>...） eval-cheap-source-map
 * 调试更友好：cheap-module-source-map
 * 
 * 生产环境：源代码要不要隐藏 调试要不要更友好   source-map
 */
