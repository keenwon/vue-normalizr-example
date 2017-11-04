'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {},
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post',
        exclude: [
          'node_modules',
          /\.spec\.ts$/
        ],
        options: {
          esModules: true
        }
      }
    ]
  }
});
