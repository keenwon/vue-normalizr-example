# store v3

目前仅完成 vuex module mixin 的逻辑
后续考虑通过独立的模块实现公共逻辑的抽离，例如 news，comments都有`getList`逻辑，新建一个ResourceModule，实现`getlist`逻辑，给news、comment调用
