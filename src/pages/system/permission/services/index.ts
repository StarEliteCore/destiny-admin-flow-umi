import { PermissionApi } from '@/apis';
import { request } from 'umi';

export const GetPermissionList = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(PermissionApi.getPermissionList, {
    method: 'GET'
  });
