import FetchConfig from '../interfaces/FetchConfig';
import commentSchema from '../../schema/comment';

/**
 * 获取评论列表
 */
const listRequest: FetchConfig = {
  method: 'GET',
  url: '/api/comments/:newsId',
  schema: [
    commentSchema
  ]
};