import { Button, Card, Form, Input, Modal } from 'antd';
import { LockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { SelectLang, history, useModel } from 'umi';

import Footer from '@/components/Footer';
import React from 'react';
import { getPageQuery } from '@/utils/utils';
import styles from './index.less';

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  history.replace(redirect || '/');
};

const Login: React.FC<{}> = () => {
  const { refresh } = useModel('@@initialState');
  const { loading, login } = useModel('useAuthModel');

  const handleSubmit = async (values: any) => {
    login(values).then(() => {
      replaceGoto();
      setTimeout(() => refresh(), 0);
    });
  };

  const showModal = () => Modal.confirm({ title: '忘记密码?', centered: true, icon: <QuestionCircleOutlined />, content: '暂不支持在线更改密码,请联系管理员修改密码' });

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <Card className={styles.cardStyle} title="Destiny Flow" headStyle={{ textAlign: 'center', height: 40, fontSize: 16, fontWeight: 'bold', borderBottom: 'none' }}>
          <Form onFinish={handleSubmit} className={styles.loginForm}>
            <Form.Item name="account" rules={[{ required: true, message: '请输入用户名!' }]}>
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
              <a className={styles.loginFormForgot} onClick={showModal}>
                忘记密码?
              </a>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
