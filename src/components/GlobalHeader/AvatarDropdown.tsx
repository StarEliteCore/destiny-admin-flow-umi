import { Avatar, Menu, Spin } from 'antd';
import { ConnectProps, Dispatch, connect } from 'umi';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';

import { ClickParam } from 'antd/es/menu';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import React from 'react';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
  dispatch: Dispatch;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;
    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({ type: 'user/logout' });
      }
    }
  };

  render(): React.ReactNode {
    const { currentUser = { avatar: '', name: '' } } = this.props;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            系统设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />} */}
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="large" className={styles.avatar} src={currentUser.avatar} alt="avatar" shape="circle" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin indicator={<LoadingOutlined spin />} size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(AvatarDropdown);
