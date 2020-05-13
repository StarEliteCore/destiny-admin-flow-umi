import { Button, Result } from 'antd';

import { Link } from 'umi';
import React from 'react';

export const NotAvailablePage: React.FC<{}> = () => (
  <Result
    status="403"
    title="403"
    style={{ marginTop: '5%' }}
    subTitle="抱歉，你无权访问该页面"
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);
