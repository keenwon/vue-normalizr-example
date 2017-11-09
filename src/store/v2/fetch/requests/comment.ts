import { IFetchRequest } from '../interfaces/IFetchRequest';
import commentSchema from '../../schema/comment';

/**
 * 获取评论列表
 */
export const commentListRequest: IFetchRequest = {
  method: 'GET',
  url: '/api/comments/:newsId',
  schema: [
    commentSchema
  ]
};

/**
 * 删除评论
 */
export const commentDeleteRequest: IFetchRequest = {
  method: 'DELETE',
  url: '/api/comments/:newsId/:commentId',
  schema: commentSchema
};
