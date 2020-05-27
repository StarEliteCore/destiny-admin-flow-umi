// 抽离Router的配置信息刀单独文件.

import { IRoute } from 'umi';

const Route: IRoute[] = [
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
    component: './exception/404'
  }
];

export default Route;
