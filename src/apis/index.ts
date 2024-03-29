//#region AuthApi
/**
 * 验证功能相关
 */
export const AuthApi = {
  /**
   * 登录API
   */
  login: 'Identity/LoginAsync'
};
//#endregion

//#region MenuApi
/**
 * 菜单相关
 */
export const MenuApi = {
  AuthorityAssignmentTree: 'Menu/GetMenuTreeAsync',
  getData: 'Menu/GetTableAsync',
  addMenu: 'Menu/AddMenuAsync',
  editMenu: 'Menu/UpdateMenuAsync',
  deleteMenu: 'Menu/DeleteAsync',
  LoadMenu: 'Menu/LoadFormMenuAsync',
  getMenuFunction: 'Menu/GetMenuFunctionListAsync',
  getMenuAsync: 'Menu/GetMenuAsync',
  GetMenuChildrenButtonAsync: 'Menu/GetMenuChildrenButtonAsync',
  getUserMenuTreeAsync: '',
  GetMenuListAsync: 'Menu/GetMenuListAsync'
};
//#endregion

//#region RoleApi
/**
 * 权限相关
 */
export const RoleApi = {
  getRolePage: 'Role/GetRolePageAsync',
  addRole: 'Role/CreateAsync',
  editRole: 'Role/UpdateAsync',
  deleteRole: 'Role/DeleteAsync',
  selectRole: 'Role/GetRoleSelectListAsync'
};
//#endregion

//#region UserApi
/**
 * 用户相关
 */
export const UserApi = {
  getPageUser: 'User/GetUserPageAsync',
  addUser: 'User/CreateAsync',
  editUser: 'User/UpdateAsync',
  deleteUser: 'User/DeleteAsync',
  loadUser: 'User/LoadAsync' //为什么这里就小写呢？
};
//#endregion

//#region FunctionApi
/**
 * 功能相关
 */
export const FunctionApi = {
  getPageFunction: 'Function/GetFunctionPageAsync',
  addFunction: 'Function/CreateAsync',
  updateFunction: 'Function/UpdateAsync',
  deleteFunction: 'Function/DeleteAsync',
  selectFunction: 'Function/GetFunctionSelectListItemAsync'
};
//#endregion
/**
 * 数据字典相关
 */
export const DataDictionaryApi = {
  getDataDictionary: 'DataDictionary/GetPageListAsync',
  updateDataDictionary: 'DataDictionary/UpdateAsync',
  createDataDictionary: 'DataDictionary/CreateAsync',
  deleteDataDictionary: 'DataDictionary/DeleteAsyc',
  getTreeDataDictionary: 'DataDictionary/GetTableAsync',
  getLoadDataDictionary: 'DataDictionary/GetDataDictionnnaryListAsync'
  //deleteDataDictionary: 'DataDictionary/DeleteAsyc',
  // getTreeDataDictionary: 'DataDictionary/GetTableAsync',
};
