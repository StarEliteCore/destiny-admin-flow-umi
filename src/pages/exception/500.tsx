import { Button, Result } from 'antd';
import { Link, useIntl } from 'umi';

import React from 'react';

const ServerErrorPage: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <Result
      status="500"
      title="500"
      style={{ marginTop: '15%' }}
      subTitle={intl.formatMessage({ id: 'exception.500.subtitle' })}
      extra={
        <Link to="/">
          <Button type="primary">{intl.formatMessage({ id: 'exception.back.home' })}</Button>
        </Link>
      }
    />
  );
};

export default ServerErrorPage;
