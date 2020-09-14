import { Avatar, Form, Input, Menu, Modal, Spin, message } from 'antd';
import { LoadingOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { getPageQuery, modalFormLayout } from '@/utils/utils';
import { history, useIntl, useModel } from 'umi';

import HeaderDropdown from '@/components/HeaderDropdown';
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
    window.localStorage.removeItem('menu');
    window.localStorage.removeItem('menulist');
    history.replace({ pathname: '/login' });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { changePassword } = useModel('user');
  const intl = useIntl();

  const [changeForm] = Form.useForm();

  const [modalShow, setModalShow] = useState<boolean>(false);

  const onModalOk = () => {
    changeForm
      .validateFields()
      .then(async (values: any) => {
        const { oldPassword, newPassword } = values;
        let args: { oldPassword: string; newPassword: string } = { oldPassword, newPassword };
        // Todo 调用修改API改掉密码
        await changePassword(args)
          .then((result: CallBackResult) => {
            if (result.state) {
              setModalShow(false);
              message.success(`修改成功!${result.msg}`);
            } else message.error(`修改失败:${result.msg}`);
          })
          .catch((reason: any) => message.error(`修改失败:${reason?.message}`));
      })
      .catch(() => message.error('输入数据校验失败.请重新输入!'));
  };

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === 'logout') {
      setInitialState({ ...initialState, currentUser: undefined });
      loginOut();
      return;
    }
    if (key === 'changePassword') {
      changeForm.resetFields();
      setModalShow(true);
    }
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
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {menu && (
          <Menu.Item key="changePassword">
            <SettingOutlined />
            修改密码
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}
      </Menu>
      <Menu.Item key="logout">
        <LogoutOutlined />
        {intl.formatMessage({ id: 'components.right.content.logout' })}
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="default" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
      <Modal visible={modalShow} forceRender destroyOnClose title="修改密码" okText="确定" cancelText="取消" centered width={550} onOk={onModalOk} onCancel={() => setModalShow(false)}>
        <Form {...modalFormLayout} form={changeForm}>
          <Form.Item name="oldPassword" hasFeedback label="旧密码" rules={[{ required: true, message: '请输入旧密码!' }]}>
            <Input allowClear placeholder="请输入旧密码" autoComplete="off" />
          </Form.Item>
          <Form.Item name="newPassword" hasFeedback label="新密码" rules={[{ required: true, message: '请输入新密码!' }]}>
            <Input.Password allowClear placeholder="请输入新密码" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: '请再次输入新密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                  return Promise.reject('两次输入的密码不一致!');
                }
              })
            ]}
          >
            <Input.Password allowClear placeholder="请再次输入新密码" autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AvatarDropdown;
