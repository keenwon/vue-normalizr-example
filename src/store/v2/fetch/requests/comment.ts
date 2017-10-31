import { IFetchConfig } from '../interfaces/IFetchConfig';
import commentSchema from '../../schema/comment';

/**
 * 获取评论列表
 */
export const commentListRequest: IFetchConfig = {
  method: 'GET',
  url: '/api/comments/:newsId',
  schema: [
    commentSchema
  ]
};
