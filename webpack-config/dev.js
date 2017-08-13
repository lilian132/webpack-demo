const webpackMerge = require('webpack-merge')
const base = require('./base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const baseDir = process.cwd()

var devConfig = webpackMerge(base, {
  output: {
    //开发环境path在根目录
    path: baseDir,
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',   //enable srouce map
  plugins: [
        new webpack.HotModuleReplacementPlugin()     //替换 webpack-dev-server
    ],
  module: {    
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })    
    
  },
  resolve: {
    alias: {      
    }
  }
});

//将打包js插入html中
var pages = Object.keys(utils.getEntry('src/views/**/*.html','src/'));
pages.forEach(function(pathname) { 
  var conf = {
    filename: path.resolve(baseDir + '/src/' + pathname + '.html'), //生成的html存放路径，默认相对于output的path,这里path.resolve处理生成绝对路径不再和path关联
    template: path.resolve(baseDir + '/src/' + pathname + '.html'), //html模板路径
    inject: true,  //js插入的位置，true/'head'/'body'/false
  };
  
  if (pathname in devConfig.entry) {   
    //conf.favicon = 'src/img/favicon.ico';
    conf.inject = 'body';
    //chunks加载路径为publicPath
    conf.chunks = [pathname,'auto_extract','common','vendor','common_css'];
  }
  devConfig.plugins.push(new HtmlWebpackPlugin(conf));
});
console.log(devConfig.output)
module.exports = devConfig