// src/access.ts
// 这个文件用于权限管理,属于约定文件,不可随便更改文件名.

export default function access(initialState: { currentUser?: Types.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  /**
   *  {
      "name": "系统管理",
      "sort": 1,
      "routerPath": "dad",
      "id": "08d812bb-e756-4c73-8106-3b70a641385a"
    },
    {
      "name": "角色管理",
      "sort": 2,
      "routerPath": "system/role",
      "id": "08d815d8-868f-45cc-8fdf-0dff5acac7fc"
    },
    {
      "name": "用户管理",
      "sort": 1,
      "routerPath": "system/user",
      "id": "08d815d8-ac6d-4df5-8113-ecb81ee27df2"
    },
    {
      "name": "菜单管理",
      "sort": 3,
      "routerPath": "system/menu",
      "id": "08d815d8-dae5-4891-83d3-38a134d63506"
    },
    {
      "name": "功能管理",
      "sort": 4,
      "routerPath": "system/function",
      "id": "08d815d8-f67c-4299-8d3a-c3243fcb5bc7"
    },
    {
      "name": "首页",
      "sort": 0,
      "routerPath": "home",
      "id": "08d815d9-93f2-4f7c-8fce-8fa321933eb3"
    },
    {
      "name": "添加",
      "sort": 2,
      "routerPath": "奥术大师多",
      "id": "08d81dd2-dc25-4ffa-8518-4b28558ba714"
    }
   */
  return {
    systemmanage: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d812bb-e756-4c73-8106-3b70a641385a')! > -1,
    rolemanage: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d815d8-868f-45cc-8fdf-0dff5acac7fc')! > -1,
    usermmanage: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d815d8-ac6d-4df5-8113-ecb81ee27df2')! > -1,
    menumanage: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d815d8-dae5-4891-83d3-38a134d63506')! > -1,
    functionmanage: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d815d8-f67c-4299-8d3a-c3243fcb5bc7')! > -1,
    home: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d815d9-93f2-4f7c-8fce-8fa321933eb3')! > -1,
    add: currentUser?.access?.findIndex((x: { id: string }) => x.id === '08d81dd2-dc25-4ffa-8518-4b28558ba714')! > -1
  };
}
