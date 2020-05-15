import { useCallback, useState } from 'react';

export default function useAuthModel() {
  const [user, setUser] = useState(null);

  const login = useCallback((account, password) => {
    // login implementation
    // setUser(user from login API)
  }, []);

  const logout = useCallback(() => {
    // logout implementation
    // setUser(null)
  }, []);

  return {
    user,
    login,
    logout
  };
}
