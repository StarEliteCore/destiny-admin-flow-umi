// 抽离Router的配置信息到单独文件.

import { IRoute } from 'umi';

const Route: IRoute[] = [
  {
    layout: false,
    component: './login',
    path: '/login'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    access: 'home',
    name: 'home',
    icon: 'home',
    path: '/home',
    component: './home'
  },
  {
    access: 'systemmanage',
    path: '/system',
    name: 'systemmanage',
    icon: 'setting',
    routes: [
      {
        access: 'rolemanage',
        name: 'rolemanage',
        icon: 'solution',
        path: '/system/role',
        component: './system/role'
      },
      {
        access: 'usermmanage',
        name: 'usermanage',
        icon: 'user',
        path: '/system/user',
        component: './system/user'
      },
      {
        access: 'menumanage',
        name: 'menumanage',
        icon: 'menu',
        path: '/system/menu',
        component: './system/menu'
      },
      {
        access: 'functionmanage',
        name: 'functionmanage',
        icon: 'menu',
        path: '/system/function',
        component: './system/function'
      },
      {
        access: 'dataDictionarymanage',
        name: 'dataDictionarymanage',
        icon: 'dataDictionary',
        path: '/system/dataDictionary',
        component: './system/dataDictionary'
      },
      {
        access: 'organizationmanage',
        name: 'organizationmanage',
        icon: 'organization',
        path: '/system/organization',
        component: './system/organization'
      }
    ]
  }
];

export default Route;
