import { IAuthService, IMenuService, IRoleService, IUserService } from '@/services/IServices';

import IocTypes from '@/ioc/config/ioc-types';
import { MainService } from './main-services';
import container from '@/ioc/config/inversify.config';

//创建主入口
export class MainManager {
  private static s_instance: MainManager;
  // 主入口服务
  private services: MainService;

  constructor() {
    this.services = container.get<MainService>(IocTypes.MainService);
  }

  //实例化主入口
  public static Instance(): MainManager {
    // if (MainManager.s_instance === null || MainManager.s_instance === undefined) MainManager.s_instance = new MainManager();
    if (!MainManager.s_instance) MainManager.s_instance = new MainManager();
    return MainManager.s_instance;
  }

  public get RoleService(): IRoleService {
    return this.services.RoleServices;
  }

  public get UserService(): IUserService {
    return this.services.UserServices;
  }

  public get MenuService(): IMenuService {
    return this.services.MenuServices;
  }

  public get AuthService(): IAuthService {
    return this.services.AuthService;
  }
}
