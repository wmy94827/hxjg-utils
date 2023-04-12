---
title: composeTree
order: 2
group:
  title: 树操作方法
---

# composeTree

构建树形结构数据的函数

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const flattenList = composeTree<T>(treeData, {
  idKey: 'id',
  parentIdKey: 'parentId',
  childrenKey: 'children',
});
```

### Params

| 参数    | 说明           | 类型      | 默认值 |
| ------- | -------------- | --------- | ------ |
| list    | 平面结构的数组 | `T[]`     | `[]`   |
| options | 配置项         | `Options` | `-`    |

### Options

| 参数              | 说明                   | 类型         | 默认值     |
| ----------------- | ---------------------- | ------------ | ---------- |
| idKey             | id 的键名              | `keyof T`    | `id`       |
| parentIdKey       | 父节点 id 的键名       | `keyof T`    | `parentId` |
| childrenKey       | 子节点的键名           | `string`     | `children` |
| rootParentIdValue | 根节点的父节点 id 的值 | `T[keyof T]` | `-`        |

### Result

| 参数     | 说明         | 类型  |
| -------- | ------------ | ----- |
| treeData | 树形结构数据 | `T[]` |
