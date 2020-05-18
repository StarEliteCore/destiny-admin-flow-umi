import { AjaxResult } from '@/dto/operationdto';
import { IRoleService } from './IRoleService';
import { Pagination } from '@/dto/pagequerydto';
import { RoleAddDto } from '@/dto/roledto';
import { RoleBaseApi } from '@/apis';

class RoleService implements IRoleService {
  /**
   * 分页查询
   */
  PageRole = (_search: Pagination): Promise<any> => RoleBaseApi.GetRolePage(_search);
  /**
   * 新增角色
   */
  AddRole = (_addRole: RoleAddDto): Promise<AjaxResult> => RoleBaseApi.AddRole(_addRole);
  /**
   * 修改角色
   * @param param
   */
  UpdateRole = (_updateRole: RoleAddDto): Promise<AjaxResult> => RoleBaseApi.UpdateRole(_updateRole);

  /**
   * 删除角色
   * @param param
   */
  DeleteRole = (param: any): Promise<AjaxResult> => RoleBaseApi.DeleteRole(param);
}

export default RoleService;
