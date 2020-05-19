import { RoleApi, UserApi } from '@/configs/apis';

import { AjaxResult } from '@/dto/ajaxdto';
import { request } from 'umi';

class UserBaseApi {
  static GetPage = (param: any): Promise<AjaxResult> =>
    request<AjaxResult>(UserApi.GetPageUser, {
      data: param,
      method: 'POST'
    });

  static LoadUser = (param: any): Promise<AjaxResult> =>
    request<AjaxResult>(UserApi.LoadUser, {
      data: param,
      method: 'GET'
    });

  static GetSelectRole = (): Promise<AjaxResult> =>
    request<AjaxResult>(RoleApi.SelectRole, {
      method: 'GET'
    });

  static UserSubmit = (param: any): Promise<AjaxResult> =>
    request<AjaxResult>(UserApi.AddOrUpdate, {
      data: param,
      method: 'POST'
    });

  static DeleteUser = (id: string): Promise<AjaxResult> =>
    request<AjaxResult>(UserApi.DeleteUser, {
      data: id,
      method: 'DELETE'
    });
}

export default UserBaseApi;
