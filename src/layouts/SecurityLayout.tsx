import { ConnectProps, Dispatch, Redirect, connect } from 'umi';

import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { ExpiredTime } from '@/configs/config';
import { PageLoading } from '@ant-design/pro-layout';
import React from 'react';
import { message } from 'antd';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
  dispatch: Dispatch;
}

interface SecurityLayoutState {
  isReady: boolean;
  userToken: null | string;
  isExpired: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  constructor(props: Readonly<SecurityLayoutProps>) {
    super(props);
    this.state = {
      isReady: false,
      userToken: '',
      isExpired: true
    };
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    const userToken = localStorage.getItem('userToken');
    const perDate: null | string = localStorage.getItem('date');
    const isExpired = Date.now() - parseInt(perDate ? perDate : '0') < ExpiredTime;
    if (!isExpired) {
      dispatch({ type: 'user/logout' });
      message.info('登陆信息已过期,请重新登陆.');
    } else this.setState({ userToken, isExpired });
  }

  componentDidMount() {
    this.setState({ isReady: true });
    const { dispatch } = this.props;
    if (dispatch) dispatch({ type: 'user/fetchCurrent' });
  }

  render() {
    const { isReady, userToken, isExpired } = this.state;
    const { children, loading } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则(比如判断 token 是否存在)
    const isLogin = userToken && isExpired;
    if ((!isLogin && loading) || !isReady) return <PageLoading />;
    if (!isLogin) return <Redirect to="/login" />;
    localStorage.setItem('date', Date.now().toString());
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user
}))(SecurityLayout);
