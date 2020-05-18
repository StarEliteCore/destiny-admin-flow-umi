// 抽离Router的配置信息刀单独文件.

import { IRoute } from 'umi';

export const routerConfig: IRoute[] = [
  {
    name: '登陆',
    layout: false,
    component: './login',
    path: '/login'
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome'
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome'
      }
    ]
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList'
  },
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    component: './404'
  }
];
