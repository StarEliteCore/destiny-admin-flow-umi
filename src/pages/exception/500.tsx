import { Button, Result } from 'antd';

import { Link } from 'umi';
import React from 'react';

export const ServerErrorPage: React.FC<{}> = () => (
  <Result
    status="500"
    title="500"
    style={{ marginTop: '5%' }}
    subTitle="抱歉，服务器出错了"
    extra={
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);
