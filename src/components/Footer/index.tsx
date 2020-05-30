import { IntlShape, useIntl } from 'umi';

import { DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';

const Footer: React.FC<{}> = () => {
  const intl: IntlShape = useIntl();
  return (
    <DefaultFooter
      copyright={intl.formatMessage({ id: 'components.footer.copyright' })}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
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
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true
        }
      ]}
    />
  );
};

export default Footer;
