import { AjaxResult } from '@/dto/ajaxdto';
import { AuthApi } from '@/apis/auth';
import { request } from 'umi';

export const Login = (param: { userName: string; password: string }): Promise<AjaxResult> =>
  request<AjaxResult>(AuthApi.login, {
    data: param,
    method: 'POST'
  });
