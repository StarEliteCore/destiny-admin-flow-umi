import { RoleApi } from '@/apis/role';
import { request } from 'umi';

export const GetSelectRole = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(RoleApi.selectRole, {
    method: 'GET'
  });
