import hxUtils from '@hxjg/utils';
import { useMemo, useState } from 'react';
import ReactJson from 'react-json-view';

export default () => {
  const [treeData] = useState([
    {
      id: '1',
      children: [
        {
          id: '1-1',
          children: [
            {
              id: '1-1-1',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      children: [
        {
          id: '2-1',
        },
      ],
    },
    {
      id: '3',
    },
  ]);

  const list = useMemo(() => {
    return hxUtils.flattenTree(treeData, {
      childrenKey: 'children',
      keepChildren: false,
    });
  }, [treeData]);

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <ReactJson
        src={treeData}
        displayDataTypes={false}
        displayObjectSize={false}
        iconStyle="square"
      />
      <ReactJson
        src={list}
        displayDataTypes={false}
        displayObjectSize={false}
        iconStyle="square"
      />
    </div>
  );
};
