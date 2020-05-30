import { useCallback, useState } from 'react';

import Cookies from 'js-cookie';
import { Login } from '@/services/auth';
import { history } from 'umi';

export default function useAuthModel() {
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(
    async ({ account, password }: { account: string; password: string }) =>
      await new Promise((resolve, reject) => {
        setLoading(true);
        Login({ userName: account, password })
          .then((response: Types.AjaxResult) => {
            let data: Types.AuthDto = response.data;
            const { accessToken, userId } = data;
            Cookies.set('accessToken', accessToken ?? '', { path: '/' });
            Cookies.set('userId', userId ?? '', { path: '/' });
            resolve(true);
          })
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const logout = useCallback(() => {
    // TODO 调用退出登录的API
    history.replace('/login');
  }, []);

  return { loading, login, logout };
}
