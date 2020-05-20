import { RoleApi } from '@/apis';
import { request } from 'umi';

export const GetSelectRole = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(RoleApi.selectRole, {
    method: 'GET'
  });
