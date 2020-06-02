import { UserApi } from '@/apis';
import { request } from 'umi';

export const LoadUser = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.loadUser, {
    params: param,
    method: 'GET'
  });
