import { DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';

export default () => (
  <DefaultFooter
    copyright="2020  微微大佬体验技术部出品"
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
