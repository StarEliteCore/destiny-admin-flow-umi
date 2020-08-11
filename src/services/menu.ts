import { MenuApi } from '@/apis';
import { request } from 'umi';

export const MenuAsyncAPI = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getMenuAsync, {
    method: 'GET'
  });
export const UserMenuTreeAsync = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getUserMenuTreeAsync, {
    method: 'GET'
  });

export const MenuButtonAsyncAPI = (param: { menuid: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.GetMenuChildrenButtonAsync, {
    method: 'GET',
    params: param
  });
