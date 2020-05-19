import { AjaxResult } from '@/dto/ajaxdto';
import { RoleApi } from '@/apis/role';
import { request } from 'umi';

export const GetSelectRole = (): Promise<AjaxResult> =>
  request<AjaxResult>(RoleApi.selectRole, {
    method: 'GET'
  });
