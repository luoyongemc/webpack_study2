/**
 * npx webpack
 * npx webpack-dev-server
 * 
 * optimize-css-assets-webpack-plugin css压缩
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//设置nodejs环境变量
process.env.NODE_ENV = 'development';

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
        test: /\.css$/i,
        //MiniCssExtractPlugin.loader  提取js中的css成单独的文件
        use: [MiniCssExtractPlugin.loader, "css-loader",
        /**
         * css兼容性处理：postcss --> postcss-loader postcss-preset-env
         * 
         * 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容样式
         */
        //使用loader的默认配置
        //修改loader的配置
        {
          loader:'postcss-loader',
          options:{
            // ident:'postcss',

            postcssOptions: {
              plugins: ['postcss-preset-env']
          }

            // plugins:() => [
            //   //postcss的插件
            //   require('postcss-preset-env')()
            // ]
          }
        }
      ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "css/main.css" }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: "development",
};
