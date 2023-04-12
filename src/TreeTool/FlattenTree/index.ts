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
  options: FlattenTreeOptions<T> = {},
): T[] {
  const { childrenKey = 'children', keepChildren = true } = options;

  const result: T[] = [];
  return treeData.reduce((previousValue, currentValue) => {
    const curItem = { ...currentValue };
    const children = currentValue[childrenKey] ?? ([] as T[]);

    // 如果不需要展开子节点，则删除子节点属性
    if (!keepChildren) {
      delete curItem[childrenKey];
    }

    return previousValue.concat(
      curItem,
      flattenTree(children, {
        childrenKey,
        keepChildren,
      }),
    );
  }, result);
}

export default flattenTree;
