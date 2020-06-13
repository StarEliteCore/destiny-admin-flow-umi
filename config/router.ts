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
    name: 'home',
    icon: 'home',
    path: '/home',
    component: './home'
  },
  {
    access: 'canAdmin',
    path: '/system',
    name: 'systemmanage',
    icon: 'setting',
    routes: [
      {
        name: 'rolemanage',
        icon: 'solution',
        path: '/system/role',
        component: './system/role'
      },
      {
        access: 'canAdmin',
        name: 'usermanage',
        icon: 'user',
        path: '/system/user',
        component: './system/user'
      },
      {
        access: 'canAdmin',
        name: 'menumanage',
        icon: 'menu',
        path: '/system/menu',
        component: './system/menu'
      }
    ]
  }
];

export default Route;
