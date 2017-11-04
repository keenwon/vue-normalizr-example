'use strict';

const devConfig = require('./build/webpack.dev');
const prodConfig = require('./build/webpack.prod');
const testConfig = require('./build/webpack.test');

module.exports = (function () {
  let config;

  switch (process.env.NODE_ENV) {
    case 'production':
      config = prodConfig;
      break;
    case 'test':
      config = testConfig;
      break;
    case 'dev':
    default:
      config = devConfig;
      break;
  }

  return config;
})()