# store v2

第二个版本的基于"normalizr 数据"的 store.

## normalize

- vuex 中动态插入一个 module "entities"，用来管理所有的 normalizr 实体。
- 定义一个通用的 fetch 方法，请求后端 URL 的同时，要指定后端响应数据的 schema。拿到后端数据后，执行 normalize，将 entities 存入上述的 module 中。

## denormalize

"entities"模块中定义 getter，返回 denormalize 后的数据。
