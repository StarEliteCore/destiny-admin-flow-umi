import { AntDesignOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { IntlShape, useIntl } from 'umi';

import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';

const Footer: React.FC<{}> = () => {
  const intl: IntlShape = useIntl();
  return (
    <DefaultFooter
      copyright={intl.formatMessage({ id: 'components.footer.copyright' })}
      links={[
        {
          key: 'ali',
          title: <AntDesignOutlined />,
          href: 'https://pro.ant.design',
          blankTarget: true
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/joesdu/destiny-admin-flow-umi',
          blankTarget: true
        },
        {
          key: 'google',
          title: <GoogleOutlined />,
          href: 'https://cn.bing.com',
          blankTarget: true
        }
      ]}
    />
  );
};

export default Footer;
