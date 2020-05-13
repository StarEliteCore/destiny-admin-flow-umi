import { IRoute } from 'umi';

export const routerConfig: IRoute[] = [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '登录',
        path: '/login',
        component: './login'
      }
    ]
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            name: '异常页面',
            path: '/exception',
            icon: 'bug',
            hideInMenu: true,
            routes: [
              {
                name: '403',
                path: '/exception/403',
                component: './exception/403'
              },
              {
                name: '404',
                path: '/exception/404',
                component: './exception/404'
              },
              {
                name: '500',
                path: '/exception/500',
                component: './exception/500'
              }
            ]
          },
          {
            path: '/',
            redirect: '/dashboard'
          },
          {
            name: '数据看板',
            path: '/dashboard',
            icon: 'pie-chart',
            component: './dashboard'
            // authority: ['数据看板']
          }
        ]
      }
    ]
  }
];
