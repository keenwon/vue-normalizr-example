'use strict';

const path = require('path');

function getPath(tsPath) {
  return path.join(__dirname, '..', tsPath);
}

module.exports = {
  entry: {
    'index': getPath('src/index.ts')
  },
  output: {
    path: getPath('dist/'),
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': './src'
    }
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      }
    ]
  }
};
