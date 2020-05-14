//所有的API接口存放文件，每个业务模块顶定义一个const
export const RoleApi = {
  GetRolePage: 'Role/GetRolePageAsync',
  AddRole: 'Role/CreateAsync',
  EditRole: 'Role/UpdateAsync',
  DeleteRole: 'Role/Delete',
  SelectRole: 'Role/GetRoleSelectListAsync'
};

//所有的API接口存放文件，每个业务模块顶定义一个const
export const UserApi = {
  GetPageUser: 'User/GetUserPageAsync',
  AddOrUpdate: 'User/AddOrUpdateAsync',
  EditUser: '',
  DeleteUser: 'User/DeleteAsync',
  LoadUser: 'User/LoadAsync'
};

//所有的API接口存放文件，每个业务模块顶定义一个const
export const MenuApi = {
  GetAuthorityTree: 'Menu/GetTreeAsync',
  GetAuthorityPageData: 'Menu/GetTableAsync',
  AddUser: '',
  EditUser: '',
  DeleteUser: 'User/Delete'
};
