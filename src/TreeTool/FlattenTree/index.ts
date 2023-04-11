/**
 * 树展开选项
 */
export interface FlattenTreeOptions<T extends Record<string, any>> {
  /**
   * 树节点的子节点在节点对象中对应的属性名
   * @default 'children'
   */
  childrenKey?: keyof T;
  /**
   * 是否在扁平化数据中保留子项
   * @default true
   */
  keepChildren?: boolean;
}

/**
 * 将指定树的所有节点展开，并返回展开后的节点列表
 * @param treeData 待展开的树
 * @param options 展开选项
 * @returns 展开后的节点列表
 */
function flattenTree<T extends Record<string, any>>(
  treeData: T[] = [],
  options: FlattenTreeOptions<T>,
): T[] {
  const { childrenKey = 'children', keepChildren = true } = options;

  const result: T[] = [];

  // 定义递归函数，用于将节点展开并添加到结果列表中
  function flatten(node: T) {
    // 创建一个新节点，复制原节点的所有属性
    const newNode = { ...node };

    // 如果不需要展开子节点，则删除子节点属性
    if (!keepChildren) {
      delete newNode[childrenKey];
    }

    // 将新节点添加到结果列表中
    result.push(newNode);

    // 递归处理子节点
    if (node[childrenKey]) {
      for (const child of node[childrenKey]) {
        flatten(child);
      }
    }
  }

  // 遍历树的根节点，并递归展开所有节点
  for (const node of treeData ?? []) {
    flatten(node);
  }

  return result;
}

export default flattenTree;
