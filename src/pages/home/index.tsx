import { Card, Typography } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const Home: React.ReactNode = (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Typography.Text strong>基于 home，快速构建标准页面</Typography.Text>
    </Card>
  </PageContainer>
);

export default Home;
