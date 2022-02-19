/**
 *  
 *  
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: "./src/js/index.js",
  output: {
    //指定名称（指定名称+目录）
    filename: "./js/[name].[contenthash:10].js",
    //输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, "build"),
    chunkFilename:'js/[name].[contenthash:10]_chunk.js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    })
  ],
  //模式
  mode: "production",
  //解析模块的规则
  resolve:{
    //配置解析模块路径别名:简写路径 缺点路径没有提示 
    alias:{
      $css:resolve(__dirname,'src/css')
    },
    //配置省略文件路径的后缀名
    extensions:['.js','.json','.css','.jsx'],
    //告诉webpack解析模块是去找哪个目录
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']
  },
  devServer: {
    compress: true,
    port: 3000,
    open: true,
    watchFiles: ["./src/index.html"],
    //开启HRM功能
    hot:true,
    //不要显示启动服务器日志信息
    clientLogLevel:'none',
    //除了一些基本启动信息外，其它内容都都不要显示
    queit:true,
    //如果出错了，不要全屏提示
    overlay:false,
    //服务器代理 --> 解决开发环境跨越问题
    proxy:{
      //一旦devServer(5000)服务器接受到 /api/xxx的请求，就会吧请求转发到另外一个服务器（3000）
      '/api':{
        target:'http://localhosst:3000',
        //发送请求时，请求路径重写：将/api/xxx --> /xxx  (去掉api)
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  optimization:{
    splitChunks:{
      chunks:'all',
      //以下的配置都是默认值，可以不写
      // minSize:30 * 1024,//分割的chunk最小为30kb
      // maxSize:0,//最大没有限制
      // minChunks:1,//要提取的chunk最少被引用1次
      // maxAsyncRequests:5,//按需加载时并行加载的文件的最大数量
      // maxInitialRequests:3,//入口js文件最大并行请求数量
      // automaticNameDelimiter:'~',//名称连接符
      // name:true,//可以使用命名规则
      // cacheGroups:{
      //   //分割chunk组
      //   //node_modules文件会被打包到vendors组的chunk中  ---> vendors ~ xxx.js
      //   vendors:{
      //     test:/[\\/]node_modules[\\/]/,
      //     //优先级
      //     priority:-10
      //   },
      // default:{
      //   //要提取的chunk最少被引用2次
      //   minChunks:2,
      //   //优先级
      //   priority:-20,
      //   //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
      //   reuseExistingChunk:true
      // }  
      // }

    },
    //将当前模块的记录其它模块的hash单独打包为一个文件  runtime
    //解决：修改a文件导致b文件的contenthash变化
    runtimeChunk:{
      name:entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer:[
      //配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        //开启缓存
        cache:true,
        //开启多进程打包
        parallel:true,
        //启动source-map
        sourceMap:true
      })
    ]
  }
};
