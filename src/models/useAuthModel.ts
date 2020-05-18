import { useCallback, useState } from 'react';

import { AuthDto } from '@/dto/authdto/authDto';
import { AuthService } from '@/services/Services';

export default function useAuthModel() {
  const [auth, setAuth] = useState(new AuthDto());
  const [loading, setLoading] = useState(false);
  let auth_service = new AuthService();

  const login = useCallback(async (account, password): Promise<void> => {
    setLoading(true);
    let response: AuthDto = await auth_service.Login({ userName: account, password });
    setAuth(response);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    // logout implementation
    // setUser(null)
  }, []);

  return { auth, loading, login, logout };
}
