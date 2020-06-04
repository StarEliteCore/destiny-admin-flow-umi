import { useCallback, useState } from 'react';

import Cookies from 'js-cookie';
import { Login } from '../services';
import { history } from 'umi';

export interface AuthModelProps {
  loading: boolean;
  login: ({ account, password }: { account: string; password: string }) => Promise<void>;
  logout: () => void;
}

const useAuthModel = (): AuthModelProps => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async ({ account, password }: { account: string; password: string }) => {
    setLoading(true);
    await Login({ userName: account, password })
      .then((response: Types.AjaxResult) => {
        let data: Types.AuthDto = response.data;
        const { accessToken, userId } = data;
        Cookies.set('accessToken', accessToken ?? '', { path: '/' });
        Cookies.set('userId', userId ?? '', { path: '/' });
      })
      .catch((error) => error)
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(() => {
    // TODO 调用退出登录的API
    history.replace('/login');
  }, []);

  return { loading, login, logout };
};

export default useAuthModel;
