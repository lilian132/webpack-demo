const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const baseDir = process.cwd()

var entries = utils.getEntry('src/views/**/*.js','src/');
// 此时生成extries:(name被去除了src/)
// { 'views/index/index': [ './src/views/index/index.js' ]}

// var chunks = Object.keys(entries);
const vendor = {
  //所有页面引入打打包配置,这里路径是./src，因为webpack执行是在项目根目录
  
  //vendor1：第三方库如vue、jquery、bootstrap打包为一个文件
  vendor: ["./src/js/jquery-1.12.4.min"], 
  //vendor2：工具类、项目通用基类打包为一个文件
  common: ["./src/js/common.js"], 
  //公有css: 会被ExtractTextPlugin处理，打包路径问题具体见ExtractTextPlugin
  common_css: ['./src/css/normalize.css'], 
}
Object.assign(entries,vendor)

var baseConfig = {
  entry: entries,//process.cwd() + '/src/index.js',  
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      //自动提取公共chunk; 浏览器加载从右往左
      //auto_extract是根据minChunks自动抽取的，其它模块对应的是入口配置的公共模块，加载顺序从右往左顺序加载
      names:['auto_extract','common_css','common','vendor'],
      minChunks: 2,  //minChunks是指一个文件至少被require几次才会被放到CommonChunk里,默认是 chunk 的数量
    })
  ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: process.cwd() + '/src/index.html',
  //     favicon: process.cwd() + '/src/index.html'
  //   })
  // ],
  module: {
    rules: [  
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      // },   
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      //   options: {
      //     minimize: true
      //   }
      // },    
      //以下资源的name 字段指定了在打包根目录（output.path）下生成
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      src: path.resolve(__dirname, './../src')
    }
  },
};



module.exports = baseConfig
