import hxUtils from '@hxjg/utils';
import { useMemo, useState } from 'react';
import ReactJson from 'react-json-view';

export default () => {
  const [list] = useState([
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

  const treeData = useMemo(() => {
    return hxUtils.composeTree(list, {
      idKey: 'id',
      parentIdKey: 'parentId',
      childrenKey: 'childrenList',
    });
  }, [list]);

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <ReactJson
        src={list}
        displayDataTypes={false}
        displayObjectSize={false}
        iconStyle="square"
      />
      <ReactJson
        src={treeData}
        displayDataTypes={false}
        displayObjectSize={false}
        iconStyle="square"
      />
    </div>
  );
};
