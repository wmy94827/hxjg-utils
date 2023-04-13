---
title: AddTreeLevel
order: 5
group:
  title: 树操作方法
  order: 1
---

# addTreeLevel

给树形结构增加一个 level 字段的层级方法

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const parentIdList = addTreeLevel<T>(treeData, {
  childrenKey: 'children',
  initialLevel: 0,
  levelKey: 'level',
});
```

### Params

| 参数     | 说明         | 类型      | 默认值 |
| -------- | ------------ | --------- | ------ |
| treeData | 树形结构数据 | `T[]`     | `-`    |
| options  | 配置项       | `Options` | `-`    |

### Options

| 参数         | 说明             | 类型      | 默认值     |
| ------------ | ---------------- | --------- | ---------- |
| childrenKey  | 子节点的键名     | `keyof T` | `children` |
| initialLevel | 初始层级         | `number`  | `0`        |
| levelKey     | level 字段的名称 | `string`  | `level`    |

### Result

| 参数           | 说明                        | 类型                             |
| -------------- | --------------------------- | -------------------------------- |
| treeDataResult | 增加了 level 的树形结构数据 | `T[] & level?: number;}` |
