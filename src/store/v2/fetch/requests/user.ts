import { IFetchRequest } from '../interfaces/IFetchRequest';
import userSchema from '../../schema/user';

/**
 * 获取用户详情
 */
export const userItemRequest: IFetchRequest = {
  method: 'GET',
  url: '/api/user/:userId',
  schema: userSchema
};

/**
 * 更新用户信息
 */
export const userUpdateRequest: IFetchRequest = {
  method: 'PATCH',
  url: '/api/user',
  schema: userSchema
}