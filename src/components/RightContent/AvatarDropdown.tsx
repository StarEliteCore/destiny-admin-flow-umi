import { Avatar, Menu, Spin } from 'antd';
import { IntlShape, history, useIntl, useModel } from 'umi';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';

import HeaderDropdown from '@/components/HeaderDropdown';
import { getPageQuery } from '@/utils/utils';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // logout();
  const { redirect } = getPageQuery();
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({ pathname: '/login' });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl: IntlShape = useIntl();

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === 'logout') {
      setInitialState({ ...initialState, currentUser: undefined });
      loginOut();
      return;
    }
    // history.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        indicator={<LoadingOutlined spin />}
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        {intl.formatMessage({ id: 'components.right.content.logout' })}
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="default" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
