// 抽离Router的配置信息到单独文件.

import { IRoute } from 'umi';

const Route: IRoute[] = [
  {
    layout: false,
    component: './login',
    path: '/login'
  },
  {
    path: '/403',
    component: './exception/403'
  },
  {
    path: '/404',
    component: './exception/404'
  },
  {
    path: '/500',
    component: './exception/500'
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
        name: 'usermanage',
        icon: 'user',
        path: '/system/user',
        component: './system/user'
      },
      {
        name: 'menumanage',
        icon: 'menu',
        path: '/system/menu',
        component: './system/menu'
      }
    ]
  }
];

export default Route;
