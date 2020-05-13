import { Button, Card, Form, Input, Modal, message } from 'antd';
import { ConnectProps, Dispatch, Loading, UserModelState, connect } from 'umi';
import { LockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

import styles from './style.less';

interface LoginProps extends Partial<ConnectProps> {
  user: UserModelState;
  dispatch: Dispatch;
  loading: boolean;
}

class Login extends Component<LoginProps> {
  private handleFinish = (values: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/login',
      payload: values,
      callback: (result: any) => {
        if (result.state) {
          dispatch({
            type: 'user/fetchSetAccount',
            callback: (resultCurrent: any) => {
              if (resultCurrent.state) dispatch({ type: 'user/gotoHome' });
              else message.error(result.msg);
            }
          });
        } else message.error(result.msg);
      }
    });
  };

  private showModal = () => Modal.confirm({ title: '忘记密码?', centered: true, icon: <QuestionCircleOutlined />, content: '暂不支持在线更改密码,请联系管理员修改密码' });

  render() {
    const { loading } = this.props;

    return (
      <Card className={styles.cardStyle} title="后台管理系统" headStyle={{ textAlign: 'center', height: 40, fontSize: 16, fontWeight: 'bold', borderBottom: 'none' }}>
        <Form onFinish={this.handleFinish} className={styles.loginForm}>
          <Form.Item name="phone" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input prefix={<UserOutlined />} allowClear placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入账户密码!' }]}>
            <Input prefix={<LockOutlined />} allowClear type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" size="large" htmlType="submit" loading={loading} shape="round" className={styles.loginFormButton}>
              登陆
            </Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <a className={styles.loginFormForgot} onClick={this.showModal}>
              忘记密码?
            </a>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default connect(({ user, loading }: { user: UserModelState; loading: Loading }) => ({
  user,
  loading: loading.models.user
}))(Login);
