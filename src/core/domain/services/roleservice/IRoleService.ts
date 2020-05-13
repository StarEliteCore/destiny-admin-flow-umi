import { IServcerReturn } from '../../dto/pagequerydto/serverReturndto';
import { RolePageDto } from "@/core/domain/dto/roledto/RoleDto"
import { RoleAddDto } from "@/core/domain/dto/roledto/RoleDto"
import { Pagination } from '../../dto/pagequerydto/querydto';
import { PageData } from '../../dto/pageDto/pageListDto';
import { AjaxResult } from '@/core/domain/dto/operationdto/AjaxResult'

export interface IRoleService {
    /**
     * 分页查询角色
     */
    PageRole(_search: Pagination): Promise<PageData<RolePageDto>>;
    /**
     * 新增角色
    */
   AddRole(_addrole: RoleAddDto): Promise<AjaxResult>;
   /**
    * 
    */
   UpdateRole(_addrole: RoleAddDto): Promise<AjaxResult>;
   /**
    * 删除角色
    * @param param 
    */
   DeleteRole(param:any):Promise<AjaxResult>;
} 