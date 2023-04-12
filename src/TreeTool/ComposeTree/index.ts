/**
 * 节点对象
 */
type TreeNode<T> = T & {
  children?: TreeNode<T>[];
  [K: string]: TreeNode<T>[] | undefined;
};

/**
 * 选项
 */
interface Options<T extends Record<string, any>> {
  idKey: keyof T; // id 的键名
  parentIdKey: keyof T; // 父节点 id 的键名
  childrenKey?: string; // 子节点的键名，默认为 'children'
  rootParentIdValue?: T[keyof T]; // 根节点的父节点 id 的值，若不指定则默认为空
}

/**
 * 将平面结构的数组转换为树形结构
 * @param list 平面结构的数组
 * @param options 选项
 * @returns 树形结构的根节点数组
 */
function composeTree<T extends Record<string, any>>(
  list: T[],
  options: Options<T>,
): TreeNode<T>[] {
  const {
    idKey, // id 的键名
    parentIdKey, // 父节点 id 的键名
    childrenKey = 'children', // 子节点的键名，默认为 'children'
    rootParentIdValue, // 根节点的父节点 id 的值，若不指定则默认为空
  } = options;

  // 用 Map 存储节点的 id 和对应的 TreeNode 对象
  const idMap = new Map<T[keyof T], TreeNode<T>>(
    list.map((val) => [val[idKey], { ...val }]), // 遍历 list，将每个节点 id 和其对应的 TreeNode 对象存入 Map 中
  );

  // 根节点数组
  const rootNodes: TreeNode<T>[] = [];

  // 遍历 Map，将每个节点加入其父节点的 children 数组中，若该节点没有父节点则将其加入根节点数组中
  idMap?.forEach((node) => {
    const parentId = node[parentIdKey];

    const treeNode: TreeNode<T> = node;

    if (idMap.has(parentId)) {
      // 若该节点有父节点，则将该节点加入到父节点的 children 数组中
      const parent = idMap.get(parentId) as Record<string, any>; // 父节点的 TreeNode 对象
      parent[childrenKey] ??= []; // 若父节点的 children 数组不存在则初始化为 []
      parent[childrenKey].push(treeNode); // 将该节点加入到父节点的 children 数组中
      if (rootParentIdValue !== undefined && rootParentIdValue === parentId) {
        rootNodes.push(treeNode); // 若该节点的父节点 id 的值等于 rootParentIdValue，则将该节点加入到根节点数组中
      }
    } else {
      // 若该节点没有父节点，则将该节点加入到根节点数组中
      if (rootParentIdValue === undefined) {
        rootNodes.push(treeNode); // 将该节点加入到根节点数组中
      }
    }
  });

  return rootNodes; // 返回根节点数组
}

export default composeTree;
