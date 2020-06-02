import { UserApi } from '@/apis';
import { request } from 'umi';

export const GetPage = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.getPageUser, {
    data: param,
    method: 'POST'
  });

export const AddUser = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.addUser, {
    data: param,
    method: 'POST'
  });

export const EditUser = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.editUser, {
    data: param,
    method: 'POST'
  });

export const DeleteUser = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.deleteUser, {
    params: param,
    method: 'DELETE'
  });
