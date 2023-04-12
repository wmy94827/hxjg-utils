import hxUtils from '@hxjg/utils';
import React, { useCallback, useState } from 'react';

export default () => {
  const [treeData] = useState([
    {
      id: '1-1',
      parentId: '1',
    },
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '2-1',
      parentId: '2',
    },
    {
      id: '3-1',
      parentId: '2',
    },
    {
      id: '3-1-1',
      parentId: '3-1',
    },
  ]);

  const onClick = useCallback(() => {
    const list = hxUtils.composeTree(treeData, {
      idKey: 'id',
      parentIdKey: 'parentId',
      // childrenKey: 'childList',
      rootParentIdValue: '2',
      childrenKey: 'childrenList',
    });
    list.map((val) => val.childrenList);
    console.log(list, treeData);
  }, [treeData]);

  return (
    <React.Fragment>
      <button type="button" onClick={onClick}>
        转换
      </button>
    </React.Fragment>
  );
};
