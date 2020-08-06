//  appService.ts

import { IRoute } from 'umi';
import { MenuDataItem } from '@ant-design/pro-layout';
import { SettingOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function loadMenuData(menuData: MenuDataItem[]): MenuDataItem[] {
  //   const menus = localStorage.getItem('menus'); // 登录后获取，存入 localStorage
  //   const resources = menus ? JSON.parse(menus) : [];
  const routes: IRoute = [
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
    //   icon: 'home',
      path: '/home',
      component: './home'
    },
    {
      access: 'systemmanage',
      path: '/system',
      name: 'systemmanage',
    //   icon: ()=>{<SettingOutlined />},
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
          access: 'add',
          name: 'dataDictionarymanage',
          icon: 'dataDictionary',
          path: '/system/dataDictionary',
          component: './system/dataDictionary'
        }
      ]
    }
  ];

  return routes;
}
