import { UserApi } from '@/apis';
import { request } from 'umi';

export const GetPage = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.getPageUser, {
    data: param,
    method: 'POST'
  });

export const LoadUser = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.loadUser, {
    data: param,
    method: 'GET'
  });

export const UserSubmit = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.addOrUpdate, {
    data: param,
    method: 'POST'
  });

export const DeleteUser = (id: string): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.deleteUser, {
    data: id,
    method: 'DELETE'
  });
