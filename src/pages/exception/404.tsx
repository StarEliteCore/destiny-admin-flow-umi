import { Button, Result } from 'antd';
import { Link, useIntl } from 'umi';

import React from 'react';

const NoFoundPage: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <Result
      status="404"
      title="404"
      style={{ marginTop: '15%' }}
      subTitle={intl.formatMessage({ id: 'exception.404.subtitle' })}
      extra={
        <Link to="/">
          <Button type="primary">{intl.formatMessage({ id: 'exception.back.home' })}</Button>
        </Link>
      }
    />
  );
};

export default NoFoundPage;
