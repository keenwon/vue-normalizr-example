import { Schema } from 'normalizr';

/**
 * method 会影响到前端收到 response 后，对 entities 的操作：
 *
 *   GET: 获取，entities 执行插入 & 替换
 *   POST: 新建，entities 执行插入 & 替换
 *   PATCH: 更新，更新什么发送什么，不需要发送全部字段，更新成功后后端只返回更新过的字段，entities 执行 merge
 *   PUT: 更新，不管更新什么，都要发送全部字段，后端也返回全部字段，entities 执行 merge
 *   DELETE: 删除，通常只发送 ID，后端删除完成后也只返回 ID，entities 执行 delete
 */
export interface IFetchRequest {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  schema?: Schema
};
