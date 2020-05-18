import { RoleApi, UserApi } from '@/configs/apis';

import { AjaxResult } from '@/dto/operationdto';
import { PageData } from '@/dto/pagedto';
import { Pagination } from '@/dto/pagequerydto';
import { UserTable } from '@/dto/userdto';
import { request } from 'umi';

class UserBaseApi {
  static GetPage = (param: Pagination): Promise<PageData<UserTable>> =>
    request<PageData<UserTable>>(UserApi.GetPageUser, {
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
    request(UserApi.AddOrUpdate, {
      data: param,
      method: 'POST'
    });

  static DeleteUser = (id: string): Promise<AjaxResult> =>
    request(UserApi.DeleteUser, {
      data: id,
      method: 'DELETE'
    });
}

export default UserBaseApi;
