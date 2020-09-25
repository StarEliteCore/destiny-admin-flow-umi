// 抽离Router的配置信息到单独文件.

import { IRoute } from 'umi';

const Route: IRoute[] = [
  {
    layout: false,
    component: './login',
    path: '/login'
  },
  {
    layout: false,
    component: './login',
    path: '/callback'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    icon: 'home',
    path: '/home',
    component: './home'
  },
  {
    access: '/system',
    path: '/system',
    name: 'systemmanage',
    icon: 'setting',
    routes: [
      {
        access: 'system/role',
        name: 'rolemanage',
        icon: 'solution',
        path: '/system/role',
        component: './system/role'
      },
      {
        access: 'system/user',
        name: 'usermanage',
        icon: 'user',
        path: '/system/user',
        component: './system/user'
      },
      {
        access: 'system/menu',
        name: 'menumanage',
        icon: 'menu',
        path: '/system/menu',
        component: './system/menu'
      },
      {
        access: 'system/function',
        name: 'functionmanage',
        icon: 'menu',
        path: '/system/function',
        component: './system/function'
      }
      // ,
      // {
      //   name: 'system/dataDictionary',
      //   icon: 'dataDictionary',
      //   path: '/system/dataDictionary',
      //   component: './system/dataDictionary'
      // }
    ]
  }
];

export default Route;
