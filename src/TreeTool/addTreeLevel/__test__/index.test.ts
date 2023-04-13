import addTreeLevel from '../index';

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

describe('addTreeLevel-给树形结构增加一个level字段的层级方法', () => {
  it('当使用默认options配置时候，输出预期结果', () => {
    const result = addTreeLevel(mockTreeData);
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
                level: 2,
              },
            ],
            level: 1,
          },
        ],
        level: 0,
      },
      {
        id: '2',
        name: 'node2',
        level: 0,
      },
    ]);

    // 不能改变原始结果
    expect(mockTreeData).toEqual(mockTreeData);
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
    const result = addTreeLevel(mockData, {
      childrenKey: 'childrenList',
    });
    expect(result).toEqual([
      {
        customId: '2',
        level: 0,
      },
      {
        customId: '1',
        childrenList: [
          {
            customId: '1-1',
            childrenList: [
              {
                customId: '1-1-1',
                level: 2,
              },
            ],
            level: 1,
          },
        ],
        level: 0,
      },
    ]);

    // 不能改变原始结果
    expect(mockData).toEqual(mockData);
  });

  it('options配置-initialLevel', () => {
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
    const result = addTreeLevel(mockData, {
      childrenKey: 'childrenList',
      initialLevel: 1,
    });
    expect(result).toEqual([
      {
        customId: '2',
        level: 1,
      },
      {
        customId: '1',
        childrenList: [
          {
            customId: '1-1',
            childrenList: [
              {
                customId: '1-1-1',
                level: 3,
              },
            ],
            level: 2,
          },
        ],
        level: 1,
      },
    ]);

    // 不能改变原始结果
    expect(mockData).toEqual(mockData);
  });

  it('options配置-levelKey', () => {
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
    const result = addTreeLevel(mockData, {
      childrenKey: 'childrenList',
      initialLevel: 1,
      levelKey: 'levelName',
    });
    expect(result).toEqual([
      {
        customId: '2',
        levelName: 1,
      },
      {
        customId: '1',
        childrenList: [
          {
            customId: '1-1',
            childrenList: [
              {
                customId: '1-1-1',
                levelName: 3,
              },
            ],
            levelName: 2,
          },
        ],
        levelName: 1,
      },
    ]);

    // 不能改变原始结果
    expect(mockData).toEqual(mockData);
  });
});
