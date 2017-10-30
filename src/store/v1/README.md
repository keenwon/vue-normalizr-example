# store v1

## normalize

在 commit 一个 mutation 的时候，如果 payload 符合下述结构：

```
{
  schema: {},
  data: {}
}
```

则按照 schema 的定义，对 data 执行 normalize 操作，将得到的 entitis 合并到 vuex store 的 entities 中，返回 result.

## denormalize

在 vuex 的 getters 中执行 denormalize，返回具体的 json 结构.
