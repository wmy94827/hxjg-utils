/**
 * 配置选项
 */
interface Options<T> {
  /**
   * 子节点的键名
   * @default children
   */
  childrenKey?: keyof T;
  /**
   * 初始层级
   * @default 0
   */
  initialLevel?: number;
  /**
   * level字段的名称
   * @default 'level'
   */
  levelKey?: string;
}

/**
 * 返回值
 */
type TreeNode<T> = T & {
  /**
   * 级别
   */
  level?: number;
};

/**
 * 给树形结构增加一个level字段的层级方法
 * @param treeData 树形结构
 * @param options 配置选项
 * @returns 增加了level字段的新树形结构
 */
function addTreeLevel<T extends Record<string, any>>(
  treeData: T[],
  options: Options<T> = {},
): TreeNode<T>[] {
  const {
    childrenKey = 'children',
    initialLevel = 0,
    levelKey = 'level',
  } = options;

  function addLevel(node: T, level: number): T {
    const children = node[childrenKey] as T[] | undefined;
    const newNode = {
      ...node,
      [childrenKey]: children?.map((child) => addLevel(child, level + 1)),
      [levelKey]: level,
    };
    return newNode;
  }

  const newTreeData = treeData.map((node) => addLevel(node, initialLevel));

  return newTreeData;
}

export default addTreeLevel;
