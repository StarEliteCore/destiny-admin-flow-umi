import { RoleAddDto, RolePageDto } from '@/dto/roledto';

import { AjaxResult } from '@/dto/operationdto';
import { PageData } from '@/dto/pagedto';
import { Pagination } from '@/dto/pagequerydto';

export interface IRoleService {
  /**
   * 分页查询角色
   */
  PageRole(_search: Pagination): Promise<PageData<RolePageDto>>;
  /**
   * 新增角色
   */
  AddRole(_addRole: RoleAddDto): Promise<AjaxResult>;
  /**
   *
   */
  UpdateRole(_addRole: RoleAddDto): Promise<AjaxResult>;
  /**
   * 删除角色
   * @param param
   */
  DeleteRole(param: any): Promise<AjaxResult>;
}
