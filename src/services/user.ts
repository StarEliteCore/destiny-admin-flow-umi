import { UserApi } from '@/apis';
import { request } from 'umi';

export const LoadUser = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(UserApi.loadUser, {
    params: param,
    method: 'GET'
  });

/**
 * 修改用户密码
 * @param data 修改密码参数
 */
// TODO 调整修改密码的API
export const ChangePasswordAPI = async (data: { oldPassword: string; newPassword: string }): Promise<any> => {
  request('Identity/ChangePassword', {
    data: data,
    method: 'POST'
  });
};
