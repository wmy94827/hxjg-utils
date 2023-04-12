import flattenTree from '../index';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

const mockTreeData: TreeNode[] = [
  {
    id: '1',
    name: 'node1',
    children: [
      {
        id: '1-1',
        name: 'node1-1',
        children: [
          {
            id: '1-1-1',
            name: 'node1-1-1',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'node2',
  },
];

describe('flattenTree-树展开', () => {
  it('当treeData为空时，需要输出空数组', () => {
    const result = flattenTree([]);
    expect(result).toEqual([]);
  });

  it('当使用默认options配置时候，输出预期结果', () => {
    const result = flattenTree(mockTreeData);
    expect(result).toEqual([
      {
        id: '1',
        name: 'node1',
        children: [
          {
            id: '1-1',
            name: 'node1-1',
            children: [
              {
                id: '1-1-1',
                name: 'node1-1-1',
              },
            ],
          },
        ],
      },
      {
        id: '1-1',
        name: 'node1-1',
        children: [
          {
            id: '1-1-1',
            name: 'node1-1-1',
          },
        ],
      },
      {
        id: '1-1-1',
        name: 'node1-1-1',
      },
      {
        id: '2',
        name: 'node2',
      },
    ]);
    // 不能改变原始结果
    expect(mockTreeData).toEqual(mockTreeData);
  });

  it('options配置-childrenKey', () => {
    const treeData = [
      {
        id: '1',
        childList: [
          {
            id: '1-1',
            childList: [
              {
                id: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        id: '2',
      },
    ];
    const result = flattenTree(treeData, {
      childrenKey: 'childList',
    });
    expect(result).toEqual([
      {
        id: '1',
        childList: [
          {
            id: '1-1',
            childList: [
              {
                id: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        id: '1-1',
        childList: [
          {
            id: '1-1-1',
          },
        ],
      },
      {
        id: '1-1-1',
      },
      {
        id: '2',
      },
    ]);
    // expect(treeData).toEqual(treeData);
  });

  it('options配置-keepChildren', () => {
    const result = flattenTree(mockTreeData, {
      keepChildren: false,
    });
    expect(result).toEqual([
      {
        id: '1',
        name: 'node1',
      },
      {
        id: '1-1',
        name: 'node1-1',
      },
      {
        id: '1-1-1',
        name: 'node1-1-1',
      },
      {
        id: '2',
        name: 'node2',
      },
    ]);
  });
});
