// const devModule = require('./webpack-config/dev');
// const prodModule = require('./webpack-config/prod');

let finalModule = {};
let ENV = process.env.NODE_ENV;

switch (ENV) {
  case 'dev':
    finalModule = require('./webpack-config/dev');
    break;
  case 'prod':
    finalModule = require('./webpack-config/prod');
    break;
  default:
    break;
}

module.exports = finalModule;
