/**
 * npx webpack
 * npx webpack-dev-server
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
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
  },
};
