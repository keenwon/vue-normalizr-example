import FetchConfig from '../interfaces/FetchConfig';
import userSchema from '../../schema/user';

/**
 * 获取新闻详情
 */
const itemRequest: FetchConfig = {
  method: 'GET',
  url: '/api/news/:newsId',
  schema: userSchema
};

/**
 * 获取新闻列表
 */
const listRequest: FetchConfig = {
  method: 'GET',
  url: '/api/news',
  schema: [
    userSchema
  ]
};
