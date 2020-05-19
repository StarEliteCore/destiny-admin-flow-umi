import { AuthService, MenuService, RoleService, UserService } from '@/services/Services';
import { IAuthService, IMenuService, IRoleService, IUserService } from '@/services/IServices';

import { Container } from 'inversify'; //挂载前端IOC容器
import IocTypes from './types';
import { MainService } from '@/ioc/manager/services';

const container = new Container(); //创建一个根容器

container.bind<MainService>(IocTypes.MainService).to(MainService);
container.bind<IRoleService>(IocTypes.RoleService).to(RoleService);
container.bind<IUserService>(IocTypes.UserService).to(UserService);
container.bind<IMenuService>(IocTypes.MenuService).to(MenuService);
container.bind<IAuthService>(IocTypes.AuthService).to(AuthService);

export default container; //导出
