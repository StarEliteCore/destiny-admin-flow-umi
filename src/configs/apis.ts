const ApiUrl: string = `${''}/api/`;

//所有的API接口存放文件，每个业务模块顶定义一个const
export const RoleApi = {
  GetRolePage: `${ApiUrl}Role/GetRolePageAsync`,
  AddRole: `${ApiUrl}Role/CreateAsync`,
  EditRole: `${ApiUrl}Role/UpdateAsync`,
  DeleteRole: `${ApiUrl}Role/Delete`,
  SelectRole: `${ApiUrl}Role/GetRoleSelectListAsync`
};

//所有的API接口存放文件，每个业务模块顶定义一个const
export const UserApi = {
  GetPageUser: `${ApiUrl}User/GetUserPageAsync`,
  AddOrUpdate: `${ApiUrl}User/AddOrUpdateAsync`,
  EditUser: `${ApiUrl}`,
  DeleteUser: `${ApiUrl}User/DeleteAsync`,
  LoadUser: `${ApiUrl}User/LoadAsync`
};

//所有的API接口存放文件，每个业务模块顶定义一个const
export const MenuApi = {
  GetAuthorityTree: `${ApiUrl}Menu/GetTreeAsync`,
  GetAuthorityPageData: `${ApiUrl}Menu/GetTableAsync`,
  AddUser: `${ApiUrl}`,
  EditUser: `${ApiUrl}`,
  DeleteUser: `${ApiUrl}User/Delete`
};
