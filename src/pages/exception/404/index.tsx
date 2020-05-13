import { Button, Result } from 'antd';

import React from 'react';
import { history } from 'umi';

export const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    style={{ marginTop: '5%' }}
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
  />
);
