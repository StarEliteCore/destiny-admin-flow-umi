import container from "@/core/iocconfig/inversify.config"
import {IocTypes} from "@/core/iocconfig/ioc-types"
import {MainService} from "./main-services"
import {IRoleService} from "@/core/domain/services/roleservice/IRoleService"
import {IUserService} from "@/core/domain/services/userservices/IUserservice"
import {IMenuService} from "@/core/domain/services/menuservice/IMenuserveces"
//创建主入口
export class MainManager{
    private static s_instance:MainManager;
    //实例化主入口
    public static Instance():MainManager{
        if(MainManager.s_instance===null|| MainManager.s_instance===undefined)
        {
            MainManager.s_instance=new MainManager();
        }
        return MainManager.s_instance;
    }
    public get RoleService():IRoleService{
        return this.services.RoleServices;
    }
    public get UserService():IUserService{
        return this.services.UserServices;
    }
    public get MenuService():IMenuService{
        return this.services.MenuServices;
    }
    //#endregion
  // 主入口服务
  private services: MainService;
  constructor(){
      this.services=container.get<MainService>(IocTypes.MainService)
  }
}