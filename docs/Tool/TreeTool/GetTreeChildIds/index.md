---
title: getTreeChildIds
order: 4
group:
  title: 树操作方法
  order: 1
---

# getTreeChildIds

根据元素 ID 在树形结构中查找所有子元素 ID 列表

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const childIdList = getTreeChildIds<T>(treeData, id, {
  childrenKey: 'children',
  idKey: 'id',
  includeSelf: false,
});
```

### Params

| 参数     | 说明         | 类型          | 默认值 |
| -------- | ------------ | ------------- | ------ |
| treeData | 树形结构数据 | `T[]`         | `-`    |
| id       | 元素 Id      | ` T[keyof T]` | `-`    |
| options  | 配置项       | `Options`     | `-`    |

### Options

| 参数        | 说明                           | 类型      | 默认值     |
| ----------- | ------------------------------ | --------- | ---------- |
| idKey       | id 的键名                      | `keyof T` | `id`       |
| childrenKey | 子节点在节点对象中对应的属性名 | `keyof T` | `children` |
| includeSelf | 是否包括目标节点本身的 ID      | `boolean` | `false`    |

### Result

| 参数        | 说明               | 类型       |
| ----------- | ------------------ | ---------- |
| childIdList | 所有子元素 Id 列表 | `string[]` |
