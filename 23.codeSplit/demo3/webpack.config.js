/**
 * 
 */


const {resolve} = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


process.env.NODE_ENV = 'production';



module.exports ={
    //多入口：有一个入口，最终输出就有一个bundle
    entry:'./src/js/index.js',
    output:{
        filename:'js/[name].[contenthash:10].js',
        path:resolve(__dirname,'build')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify:{
                //移除空格
                collapseWhitespace:true,
                //移除注释
                removeComments:true
              }
          })
    ],
    /**
     * 1.可以将node_modules中代码单独打包一个chunk最终输出
     * 
     */
    optimization:{
        splitChunks:{
           chunks:'all' 
        }
    },
    mode:'production',
    
}