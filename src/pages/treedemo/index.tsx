// @ts-nocheck

import { Card, Tree } from 'antd';
import React, { useState } from 'react';

import { PageContainer } from '@ant-design/pro-layout';

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1'
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1'
  },
  {
    title: '0-2',
    key: '0-2'
  }
];

export default (): React.ReactNode => {
  const [checkedKeys, setCheckedKeys] = useState<any>(['0-0-0']);

  const onCheck = (checkedKeys: any, e: { checked: boolean; checkedNodes: any; node: any; event: any; halfCheckedKeys: any }) => {
    let concat = checkedKeys.concat(e.halfCheckedKeys);
    console.log('concat:', concat);
    setCheckedKeys(checkedKeys);
  };

  return (
    <PageContainer>
      <Card>
        <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
      </Card>
    </PageContainer>
  );
};
