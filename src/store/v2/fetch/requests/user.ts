import { IFetchConfig } from '../interfaces/IFetchConfig';
import userSchema from '../../schema/user';

/**
 * 获取用户详情
 */
export const userItemRequest: IFetchConfig = {
  method: 'GET',
  url: '/api/user/:userId',
  schema: userSchema
};

/**
 * 更新用户信息
 */
export const userUpdateRequest: IFetchConfig = {
  method: 'PATCH',
  url: '/api/user',
  schema: userSchema
}