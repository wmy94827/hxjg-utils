import getTreeChildIds from '../index';

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

describe('getTreeChildIds-获取元素Id的所有子元素Id列表', () => {
  it('当使用默认options配置时候，输出预期结果', () => {
    const result = getTreeChildIds(mockTreeData, '1');
    expect(result).toEqual(['1-1', '1-1-1']);

    const result2 = getTreeChildIds(mockTreeData, '1-1');
    expect(result2).toEqual(['1-1-1']);

    // 不能改变原始结果
    expect(mockTreeData).toEqual(mockTreeData);
  });

  it('options配置-idKey', () => {
    const mockData = [
      {
        customId: '2',
      },
      {
        customId: '1',
        children: [
          {
            customId: '1-1',
            children: [
              {
                customId: '1-1-1',
              },
            ],
          },
        ],
      },
    ];
    const result = getTreeChildIds(mockData, '1', {
      idKey: 'customId',
    });
    expect(result).toEqual(['1-1', '1-1-1']);

    const result2 = getTreeChildIds(mockData, '2', {
      idKey: 'customId',
    });
    expect(result2).toEqual([]);

    // 不能改变原始结果
    expect(mockData).toEqual(mockData);
  });

  it('options配置-childrenKey', () => {
    const mockData = [
      {
        customId: '2',
      },
      {
        customId: '1',
        childrenList: [
          {
            customId: '1-1',
            childrenList: [
              {
                customId: '1-1-1',
              },
            ],
          },
        ],
      },
    ];
    const result = getTreeChildIds(mockData, '1-1', {
      idKey: 'customId',
      childrenKey: 'childrenList',
    });
    expect(result).toEqual(['1-1-1']);

    const result2 = getTreeChildIds(mockData, '1-1-1', {
      idKey: 'customId',
      childrenKey: 'childrenList',
    });
    expect(result2).toEqual([]);

    // 不能改变原始结果
    expect(mockData).toEqual(mockData);
  });

  it('options配置-includeSelf', () => {
    const mockData = [
      {
        customId: '2',
      },
      {
        customId: '1',
        childrenList: [
          {
            customId: '1-1',
            childrenList: [
              {
                customId: '1-1-1',
              },
            ],
          },
        ],
      },
    ];
    const result = getTreeChildIds(mockData, '1', {
      idKey: 'customId',
      childrenKey: 'childrenList',
      includeSelf: true,
    });
    expect(result).toEqual(['1', '1-1', '1-1-1']);

    // 不传includeSelf 默认不包含自己的id
    const result2 = getTreeChildIds(mockData, '1', {
      idKey: 'customId',
      childrenKey: 'childrenList',
    });
    expect(result2).toEqual(['1-1', '1-1-1']);

    // 不能改变原始结果
    expect(mockData).toEqual(mockData);
  });
});
