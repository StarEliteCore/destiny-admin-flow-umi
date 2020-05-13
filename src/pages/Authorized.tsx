import { ConnectProps, Redirect, connect } from 'umi';
import { ConnectState, UserModelState } from '@/models/connect';

import Authorized from '@/utils/Authorized';
import React from 'react';
import { getRouteAuthority } from '@/utils/utils';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: []
  },
  location = {
    pathname: ''
  },
  user
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;
  return (
    <Authorized authority={getRouteAuthority(location.pathname, routes) || ''} noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/login" />}>
      {children}
    </Authorized>
  );
};

export default connect(({ user }: ConnectState) => ({
  user
}))(AuthComponent);
