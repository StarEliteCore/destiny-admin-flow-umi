import { MenuApi } from '@/apis';
import { request } from 'umi';

/**
 * 获取菜单列表
 */
export const GetPage = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getData, {
    method: 'GET'
  });
/**
 * 添加菜单
 * @param param
 */
export const AddMenu = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.addMenu, {
    data: param,
    method: 'POST'
  });
/**
 * 修改菜单
 * @param param
 */
export const UpdateMenu = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.editMenu, {
    data: param,
    method: 'PUT'
  });
/**
 * 删除一个菜单
 * @param param
 */
export const DeleteMenu = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.deleteMenu, {
    params: param,
    method: 'DELETE'
  });
export const GetLoadMenu = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.LoadMenu, {
    params: param,
    method: 'GET'
  });

export const GetMenuFunctionList = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getMenuFunction, {
    params: param,
    method: 'GET'
  });
/**
 *
 * @param param
 */
export const GetMenuTreeList = (param: { roleId: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.AuthorityAssignmentTree, {
    params: param,
    method: 'GET'
  });
