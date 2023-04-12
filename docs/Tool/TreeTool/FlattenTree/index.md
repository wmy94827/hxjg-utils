---
title: flattenTree（展开树）
order: 1
group:
  title: 树操作方法
  order: 1
---

# flattenTree

展开树形结构数据，返回扁平化的数据列表。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const flattenList = flattenTree<T>(treeData, {
  childrenKey: 'children',
  keepChildren: true,
});
```

### Params

| 参数     | 说明         | 类型      | 默认值 |
| -------- | ------------ | --------- | ------ |
| treeData | 树形结构数据 | `T[]`     | `[]`   |
| options  | 配置项       | `Options` | `-`    |

### Options

| 参数         | 说明                           | 类型      | 默认值     |
| ------------ | ------------------------------ | --------- | ---------- |
| childrenKey  | 子节点在节点对象中对应的属性名 | `keyof T` | `children` |
| keepChildren | 是否在扁平化数据中保留子项     | `boolean` | `true`     |

### Result

| 参数        | 说明             | 类型  |
| ----------- | ---------------- | ----- |
| flattenList | 扁平化的数据列表 | `T[]` |
