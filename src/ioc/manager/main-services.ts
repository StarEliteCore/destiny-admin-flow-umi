import { injectable, inject } from 'inversify';
import IocTypes from '@/ioc/config/ioc-types';
import 'reflect-metadata';
import { IRoleService, IUserService, IMenuService } from '@/services/IServices';
/**
 * 工程主入口服务
 */
@injectable()
export class MainService {
  private roleService: IRoleService; //角色私有变量定义
  private userService: IUserService; //用户
  private menuService: IMenuService; //菜单管理

  constructor(@inject(IocTypes.RoleService) _roleService: IRoleService, @inject(IocTypes.UserService) _userService: IUserService, @inject(IocTypes.MenuService) _menuService: IMenuService) {
    this.roleService = _roleService;
    this.userService = _userService;
    this.menuService = _menuService;
  }

  //角色公开返回私有标量方法
  public get RoleServices(): IRoleService {
    return this.roleService;
  }

  //角色公开返回私有标量方法
  public get UserServices(): IUserService {
    return this.userService;
  }

  //菜单公开返回私有标量方法
  public get MenuServices(): IMenuService {
    return this.menuService;
  }
}
