import { AntDesignOutlined, GithubOutlined } from '@ant-design/icons';
import { IntlShape, useIntl } from 'umi';

import { DefaultFooter } from '@ant-design/pro-layout';
import IconFont from '@/components/IconFont';
import React from 'react';

export default (): React.ReactElement => {
  const intl: IntlShape = useIntl();
  return (
    <DefaultFooter
      copyright={intl.formatMessage({ id: 'components.footer.copyright' })}
      links={[
        {
          key: 'Ali',
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
          key: 'Bing',
          title: <IconFont type="icon-Bing" />,
          href: 'https://cn.bing.com',
          blankTarget: true
        }
      ]}
    />
  );
};
