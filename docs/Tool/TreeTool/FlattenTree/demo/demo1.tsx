import hxUtils from '@hxjg/utils';
import React, { useCallback, useState } from 'react';

export default () => {
  const [treeData] = useState([
    {
      id: '1',
      children: [
        {
          id: '1-1',
        },
      ],
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
  ]);

  const onClick = useCallback(() => {
    const list = hxUtils.flattenTree(treeData, {
      childrenKey: 'children',
      keepChildren: false,
    });
    console.log(list);
  }, [treeData]);

  return (
    <React.Fragment>
      <button type="button" onClick={onClick}>
        转换
      </button>
    </React.Fragment>
  );
};
