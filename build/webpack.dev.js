'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const bodyParser = require('body-parser');
const mockData = require('../mock.data');

module.exports = merge(common, {
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
    before(app) {
      // parse from data
      app.use(bodyParser.json());

      // 获取 news list
      app.get('/api/news', function (req, res) {
        let list = mockData.news.map(item => {
          let newItem = Object.assign({}, item);

          // 删除 content，模拟列表页和详情页的数据差异
          delete newItem.content;

          return newItem;
        });

        res.json(list);
      });

      // 获取 news 详情
      app.get('/api/news/:newsId', function (req, res) {
        let news = mockData.news.find(item => {
          return item.id === +req.params.newsId;
        });

        res.json(news);
      });

      // 根据 newsId 获取评论列表
      app.get('/api/comments/:newsId', function (req, res) {
        res.json(mockData.comments[req.params.newsId] || {});
      });

      // 获取用户详情
      app.get('/api/user/:userId', function (req, res) {
        let user = mockData.users.find(item => {
          return item.id === +req.params.userId;
        });

        res.json(user);
      });

      // 修改用户信息
      app.post('/api/user', function (req, res) {
        let id = req.body.id;
        let newName = req.body.name;

        let user = mockData.users.find(item => {
          return item.id === id;
        });

        // 修改内存中的用户名
        user.name = newName;

        res.json(user);
      });
    }
  }
});
