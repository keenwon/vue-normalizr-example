# store v2

第二个版本的基于"normalizr 数据"的 store.

## normalize

- 实现一个简单的 vue plugin，在 store 中插入一个 module "entities"，用来管理所有的 normalizr entities
- 实现一个通用的 fetch 方法，请求后端 URL 时，要指定后端响应数据的 schema。请求成功后，执行 normalize，将 entities 存入上述的 module 中，仅返回 entities id

## denormalize

"entities"模块中定义 getter，返回 denormalize 后的数据。
