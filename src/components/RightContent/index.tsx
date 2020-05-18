import { SelectLang, useModel } from 'umi';
import { Space, Tooltip } from 'antd';

import Avatar from './AvatarDropdown';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Tooltip title="使用文档">
        <span
          className={styles.action}
          onClick={() => {
            window.location.href = 'https://pro.ant.design/docs/getting-started';
          }}
        >
          <QuestionCircleOutlined />
        </span>
      </Tooltip>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
