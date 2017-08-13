const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const base = require('./base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const utils = require('./utils')
const config = require('../config')
const baseDir = process.cwd()

var prodConfig = webpackMerge(base, {
  output: {
    //path：dist目录
    path: config.build.assetsRoot,    
    //filename: 'static/js/vendor...'
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),//这里的name对应到entry对象的name,所以发布路径在getEntry控制
    //设置了publicPath之后，最终资源访问路径为 publicPath + filename路径，和path无关
    //这里暂时写死方便本地查看，所有js/css/img资源全部在static下，如果资源放在其它目录如cdn下，改变publicPath即可
    publicPath: 'D:/git/webpack-demo/dist/' 
    //以下是另一个配置，以dist_test为根目录运行项目
    //path: path.resolve(baseDir, 'dist_test'),
    //publicPath: '/dist_test/' 
  },
  module: {
    rules: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      })       
  },
  plugins: [
    //这样定义，所有js文件中通过require引入的css都会被打包成相应文件名字的css
    new ExtractTextPlugin({
      //打包路径默认为 output.path(如果设置了publicPath则为publicPath)+filename
      filename: "static/css/[name].[contenthash:8].css",
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      exclude: []
    })
  ],
  resolve: {
    alias: {
      config: path.resolve(__dirname, './../src/config/prod.js')
    }
  }
});

//将打包js插入html中
var pages = Object.keys(utils.getEntry('src/views/**/*.html','src/'));
pages.forEach(function(pathname) {
  var conf = {
    filename: pathname + '.html', //生成的html存放路径，相对于path
    template: path.resolve(baseDir + '/src/' + pathname + '.html'), //html模板路径
    inject: true,  //js插入的位置，true/'head'/'body'/false
  };
  if (pathname in prodConfig.entry) {
    //conf.favicon = 'src/img/favicon.ico';
    conf.inject = 'body';
    conf.chunks = [pathname,'auto_extract','common_css','common','vendor']; 
    //所有资源全部加上hash,则每次打包所有资源将重新200加载
    //conf.hash = true;
  }
  prodConfig.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = prodConfig