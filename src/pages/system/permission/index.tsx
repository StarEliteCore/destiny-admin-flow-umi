import { Button, Card } from 'antd';
import { IntlShape, useIntl } from 'umi';

import { ColumnProps } from 'antd/lib/table';
import ColumnTitle from '@/components/ColumnTitle';
import { LoadingObject } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

export default (): React.ReactNode => {
  const intl: IntlShape = useIntl();

  //表格
  const columns: Array<ColumnProps<Types.PermissionTable>> = [
    { title: <ColumnTitle name="权限名" />, dataIndex: 'name', key: 'name', align: 'center' },

    { title: <ColumnTitle name="描述" />, dataIndex: 'description', key: 'description', align: 'center' }
  ];

  return (
    <PageContainer>
      <Card>
        <Button type="primary" style={{ marginBottom: 15 }}>
          {intl.formatMessage({ id: '设置权限' })}
        </Button>
        <Table loading={LoadingObject(loading)} rowKey={(record) => record?.id!} tableLayout="fixed" size="small" dataSource={itemList} pagination={pagination} columns={columns}></Table>
      </Card>
    </PageContainer>
  );
};
