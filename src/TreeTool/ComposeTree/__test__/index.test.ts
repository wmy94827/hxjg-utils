import composeTree from '..';

interface TreeNode {
  id: string;
  name: string;
  parentId?: string;
}

const mockList: TreeNode[] = [
  {
    id: '1',
    name: 'node1',
  },
  {
    id: '2',
    name: 'node2',
  },
  {
    id: '1-1',
    name: 'node1-1',
    parentId: '1',
  },
  {
    id: '1-1-1',
    name: 'node1-1-1',
    parentId: '1-1',
  },
];

describe('composeTree-转换树形结构', () => {
  it('当list为空时，需要输出空数组', () => {
    const result = composeTree([]);
    expect(result).toEqual([]);
  });

  it('当使用默认options配置时候，输出预期结果', () => {
    const result = composeTree(mockList);
    expect(result).toEqual([
      {
        id: '1',
        name: 'node1',
        children: [
          {
            id: '1-1',
            name: 'node1-1',
            parentId: '1',
            children: [
              {
                id: '1-1-1',
                name: 'node1-1-1',
                parentId: '1-1',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'node2',
      },
    ]);
    // 不能改变原始结果
    expect(mockList).toEqual(mockList);
  });

  it('options配置-idKey', () => {
    const list = [
      {
        customId: '1',
      },
      {
        customId: '1-1',
        parentId: '1',
      },
    ];
    const result = composeTree(list, {
      idKey: 'customId',
    });
    expect(result).toEqual([
      {
        customId: '1',
        children: [
          {
            customId: '1-1',
            parentId: '1',
          },
        ],
      },
    ]);
    expect(list).toEqual(list);
  });

  it('options配置-parentIdKey', () => {
    const list = [
      {
        customId: '1',
      },
      {
        customId: '1-1',
        customParentId: '1',
      },
    ];
    const result = composeTree(list, {
      idKey: 'customId',
      parentIdKey: 'customParentId',
    });
    expect(result).toEqual([
      {
        customId: '1',
        children: [
          {
            customId: '1-1',
            customParentId: '1',
          },
        ],
      },
    ]);
    expect(list).toEqual(list);
  });

  it('options配置-childrenKey', () => {
    const list = [
      {
        customId: '1',
      },
      {
        customId: '1-1',
        customParentId: '1',
      },
    ];
    const result = composeTree(list, {
      idKey: 'customId',
      parentIdKey: 'customParentId',
      childrenKey: 'customChild',
    });
    expect(result).toEqual([
      {
        customId: '1',
        customChild: [
          {
            customId: '1-1',
            customParentId: '1',
          },
        ],
      },
    ]);
    expect(list).toEqual(list);
  });

  it('options配置-rootParentIdValue', () => {
    const list = [
      {
        customId: '1',
      },
      {
        customId: '1-1',
        customParentId: '1',
      },
    ];
    const result = composeTree(list, {
      idKey: 'customId',
      parentIdKey: 'customParentId',
      childrenKey: 'customChild',
      rootParentIdValue: '1',
    });
    expect(result).toEqual([
      {
        customId: '1-1',
        customParentId: '1',
      },
    ]);
    expect(list).toEqual(list);
  });
});
