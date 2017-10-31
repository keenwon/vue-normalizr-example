import FetchConfig from '../interfaces/FetchConfig';
import userSchema from '../../schema/user';

/**
 * 获取用户详情
 */
const itemRequest: FetchConfig = {
  method: 'GET',
  url: '/api/user/:userId',
  schema: userSchema
};

/**
 * 更新用户信息
 */
const updateRequest: FetchConfig = {
  method: 'POST',
  url: '/api/user/:userId',
  schema: userSchema
}