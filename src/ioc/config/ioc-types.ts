interface IIocTypes {
  MainService: symbol;
  RoleService: symbol;
  UserService: symbol;
  MenuService: symbol;
}

///声明IOC唯一值
const IocTypes: IIocTypes = {
  MainService: Symbol('MainService'),
  RoleService: Symbol('RoleService'),
  UserService: Symbol('UserService'),
  MenuService: Symbol('MenuService')
};

export default IocTypes;
