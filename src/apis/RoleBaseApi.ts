import { RoleAddDto, RolePageDto } from '@/dto/roledto';

import { AjaxResult } from '@/dto/operationdto';
import { PageData } from '@/dto/pagedto';
import { Pagination } from '@/dto/pagequerydto';
import { RoleApi } from '@/configs/apis';
import { request } from 'umi';

class RoleBaseApi {
  static GetRolePage = (param: Pagination): Promise<PageData<RolePageDto>> =>
    request<PageData<RolePageDto>>(RoleApi.GetRolePage, {
      data: param,
      method: 'POST'
    });

  static AddRole = (param: RoleAddDto): Promise<AjaxResult> =>
    request<AjaxResult>(RoleApi.AddRole, {
      data: param,
      method: 'POST'
    });

  static UpdateRole = (param: RoleAddDto): Promise<AjaxResult> =>
    request<AjaxResult>(RoleApi.EditRole, {
      data: param,
      method: 'PUT'
    });

  static DeleteRole = (param: any): Promise<AjaxResult> =>
    request(RoleApi.EditRole, {
      data: param,
      method: 'DELETE'
    });
}

export default RoleBaseApi;
