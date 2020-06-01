import { Button, Result } from 'antd';
import { Link, useIntl } from 'umi';

import React from 'react';

const NotAvailablePage: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <Result
      status={403}
      title="403"
      style={{ marginTop: '15%' }}
      subTitle={intl.formatMessage({ id: 'exception.403.subtitle' })}
      extra={
        <Link to="/">
          <Button type="primary">{intl.formatMessage({ id: 'exception.back.home' })}</Button>
        </Link>
      }
    />
  );
};

export default NotAvailablePage;
