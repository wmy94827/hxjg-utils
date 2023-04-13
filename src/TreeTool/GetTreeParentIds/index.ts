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
 * 根据元素ID在树形结构中查找所有父元素ID列表
 * @param treeData 树形结构
 * @param id 元素ID
 * @param options 配置选项
 * @returns 父元素ID列表
 */
function getTreeParentIds<T extends Record<string, any>>(
  treeData: T[],
  id: T[keyof T],
  options: Options<T> = {},
): string[] {
  const {
    idKey = 'id',
    childrenKey = 'children',
    includeSelf = false,
  } = options;

  const result: string[] = [];

  // 递归函数，用于遍历树形结构
  function findParentIds(tree: T[], targetId: string): boolean {
    for (const node of tree) {
      // 如果当前节点是目标节点，则说明已经找到目标节点的所有父节点，将所有父节点ID返回
      if (node[idKey] === targetId) {
        return true;
      }

      const children = (node[childrenKey] ?? []) as T[];

      // 如果当前节点有子节点，则递归遍历子节点
      if (children.length > 0 && findParentIds(children, targetId)) {
        // 如果找到目标节点，则将当前节点的ID添加到父元素ID列表中
        result.push(node[idKey]);
        return true;
      }
    }

    // 如果没有找到目标节点，则返回false
    return false;
  }

  findParentIds(treeData, id);

  // 是否包括目标节点本身的ID
  if (includeSelf) {
    result.unshift(id);
  }

  return result.reverse(); // 因为是从下到上递归遍历，需要反转结果列表
}

export default getTreeParentIds;
