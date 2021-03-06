'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const bodyParser = require('body-parser');
const mockData = require('../mock.data');

function initDevApi(app) {
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
    res.json(mockData.comments[req.params.newsId] || []);
  });

  // 删除评论
  app.delete('/api/comments/:newsId/:commentId', function (req, res) {
    let newsId = req.params.newsId;
    let commentId = req.params.commentId;

    mockData.comments[newsId] = mockData.comments[newsId].filter(comment => {
      return comment.id !== +commentId;
    });

    /**
     * 返回局部（ID）信息，模拟后端的 delete 操作
     * 此时前端数据层 normalize 之后，需要删除原先的数据
     */
    res.json({
      id: commentId
    });
  });

  // 获取用户详情
  app.get('/api/user/:userId', function (req, res) {
    let user = mockData.users.find(item => {
      return item.id === +req.params.userId;
    });

    res.json(user);
  });

  // 修改用户信息
  app.patch('/api/user', function (req, res) {
    let id = req.body.id;
    let newName = req.body.name;

    let user = mockData.users.find(item => {
      return item.id === id;
    });

    // 修改内存中的用户名
    user.name = newName;

    /**
     * 返回局部信息，模拟后端的 update 操作
     * 此时前端数据层 normalize 之后，需要与原先的数据 merge
     */
    res.json({
      id,
      name: newName
    });
  });
}

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
      initDevApi(app);
    }
  }
});
