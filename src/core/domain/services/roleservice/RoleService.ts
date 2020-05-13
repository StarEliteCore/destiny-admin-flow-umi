import { injectable } from "inversify"
import "reflect-metadata"
import { Pagination } from "@/core/domain/dto/pagequerydto/querydto.ts";
import { IServcerReturn } from "../../dto/pagequerydto/serverReturndto";
import { AjaxResult } from '@/core/domain/dto/operationdto/AjaxResult'

import { IRoleService } from "./IRoleService"
import { RolePageDto,RoleAddDto } from "@/core/domain/dto/roledto/RoleDto"

import RoleApiBase from "@/core/data-source/requestapi/roleapi/rolerequestApi"
import { PageData } from '../../dto/pageDto/pageListDto';
// import { Role } from '../../dto/roledto/RoleDto';

@injectable()
export default class RoleService implements IRoleService {
    
    /**
     * 分页查询
     */
    async PageRole(_search: Pagination): Promise<any> {
        return RoleApiBase.GetRolePage(_search);
    }
    /**
     * 新增角色
     */
    async AddRole(_addrole: RoleAddDto): Promise<AjaxResult> {
        return RoleApiBase.AddRole(_addrole);
    }
    /**
    * 修改角色
    * @param param 
    */
    async UpdateRole(_updaterole: RoleAddDto): Promise<AjaxResult> 
    {
        return RoleApiBase.UpdateRole(_updaterole);
    }
    /**
    * 删除角色
    * @param param 
    */
    async DeleteRole(param:any):Promise<AjaxResult>{
        return RoleApiBase.DeleteRole(param);
    }

}
