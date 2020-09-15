import { ChangePasswordAPI } from '@/services/user';
import { useCallback } from 'react';

export default function useUserModel() {
  const changePassword = useCallback(async (payload: { oldPassword: string; newPassword: string }) => {
    try {
      let response: any = await ChangePasswordAPI(payload);
      if (!!response && response.code === 1000) return { state: true, msg: response.msg };
      else return { state: false, msg: response.msg };
    } catch (error) {
      throw error;
    }
  }, []);

  return { changePassword };
}
