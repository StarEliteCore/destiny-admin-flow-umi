import { injectable, inject } from "inversify";
import {IocTypes} from "@/core/iocconfig/ioc-types"
import "reflect-metadata"
import {IRoleService} from "@/core/domain/services/roleservice/IRoleService"
import {IUserService} from "@/core/domain/services/userservices/IUserservice"
import {IMenuService} from "@/core/domain/services/menuservice/IMenuserveces"
/**
 * 工程主入口服务
 */
@injectable()
export class MainService{

    private roleService:IRoleService;//角色私有变量定义
    private userService:IUserService;//用户
    private menuService:IMenuService;//菜单管理
    //角色公开返回私有标量方法
    public get RoleServices():IRoleService{
        return this.roleService;
    }
    //角色公开返回私有标量方法
    public get UserServices():IUserService{
        return this.userService;

    }
    //菜单公开返回私有标量方法
    public get MenuServices():IMenuService{
        return this.menuService;

    }
    constructor(
        @inject(IocTypes.RoleService)_roleService:IRoleService,
        @inject(IocTypes.UserService)_userService:IUserService,
        @inject(IocTypes.MenuService)_menuService:IMenuService)
    {
        this.roleService=_roleService;
        this.userService=_userService;
        this.menuService=_menuService
    }

}