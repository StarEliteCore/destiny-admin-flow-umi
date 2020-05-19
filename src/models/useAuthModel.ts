import { useCallback, useState } from 'react';

import { AuthDto } from '@/dto/authdto/authDto';
import { MainManager } from '@/ioc/manager/manager';

export default function useAuthModel() {
  const [auth, setAuth] = useState(new AuthDto());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (account, password): Promise<void> => {
    setLoading(true);
    let response: AuthDto = await MainManager.Instance().AuthService.Login({ userName: account, password });
    setAuth(response);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    // logout implementation
    // setUser(null)
  }, []);

  return { auth, loading, login, logout };
}
