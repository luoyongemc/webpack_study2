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
  mode: "development",
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
};
