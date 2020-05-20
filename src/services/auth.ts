import { AuthApi } from '@/apis/auth';
import { request } from 'umi';

export const Login = (param: { userName: string; password: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(AuthApi.login, {
    data: param,
    method: 'POST'
  });
