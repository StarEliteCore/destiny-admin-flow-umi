import { Card, Typography } from 'antd';

import React from 'react';

const Home: React.ReactNode = (): React.ReactNode => (
  <div className="global-container">
    <Card>
      <Typography.Text strong>基于 home，快速构建标准页面</Typography.Text>
    </Card>
  </div>
);

export default Home;
