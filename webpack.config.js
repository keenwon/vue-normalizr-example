"use strict";

const path = require('path');
const webpack = require('webpack');
const mockData = require('./mock.data');

function getPath(tsPath) {
  return path.join(__dirname, tsPath);
}

const config = {
  entry: {
    'index': getPath('src/index.js')
  },
  output: {
    path: getPath('dist/'),
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      }
    ]
  },
  devServer: {
    before(app){
      app.get('/api/news/list', function(req, res) {
        res.json(mockData.news);
      });

      app.get('/api/comments/:newsId', function(req, res) {
        res.json(mockData.comments[req.params.newsId]);
      });
    }
  }
};

module.exports = config;
