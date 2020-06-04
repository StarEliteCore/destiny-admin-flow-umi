import { Card, Typography } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Typography.Text strong>基于 menu 开发，快速构建标准页面</Typography.Text>
    </Card>
  </PageContainer>
);
