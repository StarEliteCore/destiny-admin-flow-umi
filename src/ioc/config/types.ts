///声明IOC唯一值
const IocTypes = {
  MainService: Symbol('MainService'),
  RoleService: Symbol('RoleService'),
  UserService: Symbol('UserService'),
  MenuService: Symbol('MenuService'),
  AuthService: Symbol('AuthService')
};

export default IocTypes;
