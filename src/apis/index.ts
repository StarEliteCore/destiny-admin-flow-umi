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
  getAuthorityTree: 'Menu/GetTreeAsync',
  getAuthorityPageData: 'Menu/GetTableAsync',
  /**
   * 新增用户
   */
  addUser: '',
  /**
   * 修改用户
   */
  editUser: '',
  /**
   * 删除用户
   */
  deleteUser: 'User/Delete'
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
  deleteRole: 'Role/Delete',
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
  loadUser: 'User/LoadAsync'
};
//#endregion
