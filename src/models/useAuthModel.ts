import { useCallback, useState } from 'react';

import { Login } from '@/services/auth';
import cookie from 'react-cookies';

export default function useAuthModel() {
  let temp: Types.AuthDto = {
    accessExpires: 0,
    accessToken: '',
    nickName: '',
    userId: ''
  };
  const [auth, setAuth] = useState(temp);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (account, password) => {
    setLoading(true);
    await Login({ userName: account, password })
      .then((response: Types.AjaxResult) => {
        let data: Types.AuthDto = response.data;
        const { accessToken } = data;
        cookie.save('accessToken', accessToken, { path: '/' });
        setAuth(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const logout = useCallback(() => {
    // logout implementation
    // setUser(null)
  }, []);

  return { auth, loading, login, logout };
}
