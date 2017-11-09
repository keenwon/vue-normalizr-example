import { IFetchRequest } from '../interfaces/IFetchRequest';
import newsSchema from '../../schema/news';

/**
 * 获取新闻详情
 */
export const newsItemRequest: IFetchRequest = {
  method: 'GET',
  url: '/api/news/:newsId',
  schema: newsSchema
};

/**
 * 获取新闻列表
 */
export const newsListRequest: IFetchRequest = {
  method: 'GET',
  url: '/api/news',
  schema: [
    newsSchema
  ]
};
