import { useCallback, useState } from 'react';

import Cookies from 'js-cookie';
import { Login } from '../services';

const useAuthModel = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async (payload: { userName: string; password: string }): Promise<Types.AuthDto> => {
    try {
      setLoading(true);
      let response: Types.AjaxResult = await Login(payload).finally(() => setLoading(false));
      if (!!response && response.success) {
        let data: Types.AuthDto = response.data;
        const { accessToken, userId } = data;
        Cookies.set('accessToken', accessToken ?? '', { path: '/' });
        Cookies.set('userId', userId ?? '', { path: '/' });
        return data;
      } else throw Error(response.message);
    } catch (error) {
      throw error;
    }
  }, []);

  return { loading, login };
};

export default useAuthModel;
