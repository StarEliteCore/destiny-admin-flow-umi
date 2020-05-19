import { useCallback, useState } from 'react';

import { AuthDto } from '@/dto/authdto';
import { AuthService } from '@/services/Services';
import { Guid } from 'guid-typescript';

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
    await new AuthService()
      .Login({ userName: account, password })
      .then((response: AuthDto) => {
        setAuth(response);
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
