import { Button, Card, Form, Input, Modal, message } from 'antd';
import { Helmet, IntlShape, SelectLang, useIntl, useModel } from 'umi';
import { LockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';

import Footer from '@/components/Footer';
import React from 'react';
import { getPageQuery } from '@/utils/utils';
import styles from './index.less';

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = async (): Promise<void> => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) redirect = redirect.substr(redirect.indexOf('#') + 1);
    } else {
      window.location.href = '/';
      return;
    }
  }
  window.location.href = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/');
};

export default (): React.ReactNode => {
  const intl: IntlShape = useIntl();

  const { refresh } = useModel('@@initialState');
  const { loading, login } = useModel('auth');

  const handleSubmit = async (values: any) => {
    const { userName, password } = values;
    let args: { userName: string; password: string } = { userName, password };
    await login(args)
      .then(async result => {
        if (result) await refresh().then(replaceGoto);
        else message.info('登陆失败');
      })
      .catch((reason: any) => message.error(`登陆失败:${reason}`));
  };

  const showModal = () =>
    Modal.confirm({
      title: intl.formatMessage({ id: 'login.forget.password' }),
      centered: true,
      icon: <QuestionCircleOutlined />,
      content: intl.formatMessage({ id: 'login.modal.content' })
    });

  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>登录</title>
      </Helmet>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <Card
          style={{ width: 350 }}
          title={intl.formatMessage({ id: 'login.project.title' })}
          bordered={false}
          headStyle={{
            textAlign: 'center',
            height: 40,
            fontSize: 16,
            fontWeight: 'bold',
            borderBottom: 'none'
          }}
        >
          <Form onFinish={handleSubmit} style={{ maxWidth: 350 }}>
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'login.error.account' })
                }
              ]}
            >
              <Input prefix={<UserOutlined />} allowClear placeholder={intl.formatMessage({ id: 'login.input.account' })} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'login.error.password' })
                }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} allowClear placeholder={intl.formatMessage({ id: 'login.input.password' })} />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" size="large" htmlType="submit" loading={loading} shape="round" style={{ width: '100%', marginTop: 15 }}>
                {intl.formatMessage({ id: 'login.submit.button' })}
              </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <a style={{ float: 'right', color: '#b2b2b2', marginTop: 15 }} onClick={showModal}>
                {intl.formatMessage({ id: 'login.forget.password' })}
              </a>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};
