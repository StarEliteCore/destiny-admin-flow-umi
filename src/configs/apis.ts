//所有的API接口存放文件，每个业务模块顶定义一个const JSON对象 可以考虑像示例中那样写入注释信息

/**
 * 权限相关
 */
export const RoleApi = {
  GetRolePage: 'Role/GetRolePageAsync',
  AddRole: 'Role/CreateAsync',
  EditRole: 'Role/UpdateAsync',
  DeleteRole: 'Role/Delete',
  SelectRole: 'Role/GetRoleSelectListAsync'
};

/**
 * 用户相关
 */
export const UserApi = {
  GetPageUser: 'User/GetUserPageAsync',
  AddOrUpdate: 'User/AddOrUpdateAsync',
  EditUser: '',
  DeleteUser: 'User/DeleteAsync',
  LoadUser: 'User/LoadAsync'
};

/**
 * 菜单相关
 */
export const MenuApi = {
  GetAuthorityTree: 'Menu/GetTreeAsync',
  GetAuthorityPageData: 'Menu/GetTableAsync',
  /**
   * 新增用户
   */
  AddUser: '',
  /**
   * 修改用户
   */
  EditUser: '',
  /**
   * 删除用户
   */
  DeleteUser: 'User/Delete'
};
