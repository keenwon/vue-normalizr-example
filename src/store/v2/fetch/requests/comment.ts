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

/**
 * 删除评论
 */
export const commentDeleteRequest: IFetchConfig = {
  method: 'DELETE',
  url: '/api/comments/:newsId/:commentId',
  schema: commentSchema
};
