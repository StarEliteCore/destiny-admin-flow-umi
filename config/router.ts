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
    path: '/',
    redirect: '/welcome'
  },
  {
    component: './404'
  }
];
