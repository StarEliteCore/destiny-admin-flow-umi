import { AjaxResult } from '@/dto/ajaxdto';
import { UserApi } from '@/apis/user';
import { request } from 'umi';

export const GetPage = (param: any): Promise<AjaxResult> =>
  request<AjaxResult>(UserApi.getPageUser, {
    data: param,
    method: 'POST'
  });

export const LoadUser = (param: any): Promise<AjaxResult> =>
  request<AjaxResult>(UserApi.loadUser, {
    data: param,
    method: 'GET'
  });

export const UserSubmit = (param: any): Promise<AjaxResult> =>
  request<AjaxResult>(UserApi.addOrUpdate, {
    data: param,
    method: 'POST'
  });

export const DeleteUser = (id: string): Promise<AjaxResult> =>
  request<AjaxResult>(UserApi.deleteUser, {
    data: id,
    method: 'DELETE'
  });
