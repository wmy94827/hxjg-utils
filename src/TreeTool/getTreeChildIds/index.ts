/**
 * 配置选项
 */
interface Options<T> {
  /**
   * id 的键名
   * @default id
   */
  idKey?: keyof T;
  /**
   * 子节点的键名
   * @default children
   */
  childrenKey?: keyof T;
  /**
   * 是否包括目标节点本身的ID
   * @default false
   */
  includeSelf?: boolean;
}

/**
 * 根据元素ID在树形结构中查找所有子元素ID列表
 * @param treeData 树形结构
 * @param id 元素ID
 * @param options 配置选项
 * @returns 子元素ID列表
 */
function getTreeChildIds<T extends Record<string, any>>(
  treeData: T[],
  id: string,
  options: Options<T> = {},
): string[] {
  const {
    idKey = 'id',
    childrenKey = 'children',
    includeSelf = false,
  } = options;

  const result: string[] = [];

  // 是否包括目标节点本身的ID
  if (includeSelf) {
    result.push(id);
  }

  // 递归函数，用于遍历树形结构
  function findChildIds(tree: T[], targetId: string): void {
    for (const node of tree) {
      // 如果当前节点是目标节点，则将其子节点的ID添加到结果列表中
      if (node[idKey] === targetId) {
        const children = (node[childrenKey] ?? []) as T[];
        for (const child of children) {
          result.push(child[idKey] as string);
          findChildIds(children, child[idKey] as string);
        }
      } else {
        // 如果当前节点不是目标节点，则继续遍历其子节点
        const children = (node[childrenKey] ?? []) as T[];
        if (children.length > 0) {
          findChildIds(children, targetId);
        }
      }
    }
  }

  findChildIds(treeData, id);

  return result;
}

export default getTreeChildIds;
