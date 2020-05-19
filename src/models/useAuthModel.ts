import { useCallback, useState } from 'react';

import { AjaxResult } from '@/dto/ajaxdto';
import { AuthDto } from '@/dto/authdto';
import { Guid } from 'guid-typescript';
import { Login } from '@/services/auth';

export default function useAuthModel() {
  let temp: AuthDto = {
    accessExpires: 0,
    accessToken: '',
    nickName: '',
    userId: Guid.createEmpty()
  };
  const [auth, setAuth] = useState(temp);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (account, password) => {
    setLoading(true);
    await Login({ userName: account, password })
      .then((response: AjaxResult) => {
        setAuth(response.data);
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
