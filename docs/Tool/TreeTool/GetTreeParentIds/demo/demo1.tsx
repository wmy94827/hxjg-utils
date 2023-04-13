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
    },
  ]);

  const parentIdList = useMemo(() => {
    return hxUtils.getTreeParentIds(treeData, '1-1-1', {
      idKey: 'id',
      childrenKey: 'children',
      includeSelf: false,
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
        src={parentIdList}
        displayDataTypes={false}
        displayObjectSize={false}
        iconStyle="square"
      />
    </div>
  );
};
