"use strict";

const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const bodyParser = require('body-parser');
const mockData = require('./mock.data');

function getPath(tsPath) {
  return path.join(__dirname, tsPath);
}

const config = {
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
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
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
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
    before(app){
      // parse from data
      app.use(bodyParser.urlencoded({ 
        extended: true 
      }));

      // 获取 news list
      app.get('/api/news', function(req, res) {
        let list = mockData.news.map(item => {
          let newItem = Object.assign({}, item);

          // 删除 content，模拟列表页和详情页的数据差异
          delete newItem.content;

          return newItem;
        });

        res.json(list);
      });

      // 获取 news 详情
      app.get('/api/news/:newsId', function(req, res) {
        let news = mockData.news.find(item => {
          return item.id === +req.params.newsId;
        });

        res.json(news);
      });

      // 根据 newsId 获取评论列表
      app.get('/api/comments/:newsId', function(req, res) {
        res.json(mockData.comments[req.params.newsId] || {});
      });

      // 获取用户详情
      app.get('/api/user/:userId', function(req, res) {
        let user = mockData.users.find(item => {
          return item.id === +req.params.userId;
        });

        res.json(user);
      });

      // 修改用户信息
      app.post('/api/user/:userId', function(req, res) {
        let newName = req.body.name;

        let user = mockData.users.find(item => {
          return item.id === +req.params.userId;
        });

        // 修改内存中的用户名
        user.name = newName;

        res.json(user);
      });
    }
  }
};

module.exports = config;
