'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {},
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i
    })
  ],
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
