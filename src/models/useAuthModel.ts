import { useCallback, useState } from 'react';

import { AuthDto } from '@/dto/authdto/authDto';
import { MainManager } from '@/ioc/manager/main-manager';

export default function useAuthModel() {
  const [auth, setAuth] = useState(new AuthDto());

  const login = useCallback(async (account, password) => {
    let response: AuthDto = await MainManager.Instance().AuthService.Login({ userName: account, password });
    setAuth(response);
  }, []);

  const logout = useCallback(() => {
    // logout implementation
    // setUser(null)
  }, []);

  return {
    auth,
    login,
    logout
  };
}
