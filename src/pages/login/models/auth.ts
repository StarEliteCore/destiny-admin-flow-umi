import { useCallback, useState } from 'react';

import Cookies from 'js-cookie';
import { Login } from '../services';
import { history } from 'umi';

const useAuthModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(
    async ({ account, password }: { account: string; password: string }) =>
      await new Promise(async (resolve, reject) => {
        setLoading(true);
        await Login({ userName: account, password })
          .then((response: Types.AjaxResult) => {
            if (response.success == false) {
              console.log('sda123sad13sa1');
            } else {
              let data: Types.AuthDto = response.data;
              const { accessToken, userId } = data;
              Cookies.set('accessToken', accessToken ?? '', { path: '/' });
              Cookies.set('userId', userId ?? '', { path: '/' });
              resolve(data);
            }
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
};

export default useAuthModel;
