// 抽离Router的配置信息刀单独文件.

import { IRoute } from 'umi';

export const routerConfig: IRoute[] = [
  {
    layout: false,
    component: './login',
    path: '/login'
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './welcome'
  },
  {
    path: '/user',
    name: '用户',
    icon: 'smile',
    // component: './welcome',
    routes: [
      {
        path: '/user/usermgr',
        name: 'usermgr',
        icon: 'smile',
        component: './user',
      }
    ]
  },
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    component: './exception/404'
  }
];
