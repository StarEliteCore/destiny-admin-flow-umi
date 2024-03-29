import { MenuApi, RoleApi } from '@/apis';

import { request } from 'umi';

export const GetRolePage = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(RoleApi.getRolePage, {
    data: param,
    method: 'POST'
  });

export const AddRole = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(RoleApi.addRole, {
    data: param,
    method: 'POST'
  });

export const EditRole = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(RoleApi.editRole, {
    data: param,
    method: 'PUT'
  });

export const DeleteRole = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(RoleApi.deleteRole, {
    params: param,
    method: 'DELETE'
  });
/**
 *
 * @param param
 */
export const GetMenuTreeList = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.AuthorityAssignmentTree, {
    method: 'GET'
  });
// export const GetTreeSelect = (): Promise<TreeModel<Types.TreeMenu>> =>
//   request<TreeModel<Types.TreeMenu>>(MenuApi.selectTreeMenu, {
//     method: 'Get'
//   });
