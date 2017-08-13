var path = require('path')

//基础配置
module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',//静态资源路径
    assetsPublicPath: '/',//
    productionSourceMap: true
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    port: 8080,
    proxyTable: {},
    cssSourceMap: true
  }
}
