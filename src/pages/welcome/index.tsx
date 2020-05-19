import { Alert, Card, Typography } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      <Alert message="umi ui 现已发布，点击右下角 umi 图标即可使用" type="success" showIcon banner style={{ margin: -12, marginBottom: 24 }} />
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
          基于 block 开发，快速构建标准页面
        </a>
      </Typography.Text>
      <Typography.Text strong style={{ marginBottom: 12 }}>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks">
          获取全部区块
        </a>
      </Typography.Text>
    </Card>
  </PageHeaderWrapper>
);
