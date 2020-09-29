// src/app.ts 运行时配置文件,属于约定文件,无法更改文件名.里边的内容也需要根据开发文档定义以及使用.

import { AvatarGif, LogoPng } from '@/assets';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { ErrorShowType, RequestConfig, history, useRouteMatch } from 'umi';
import { MenuAsyncAPI, MenuListAsync } from '@/services/menu';
import { BaseUrl } from '@/configs';
import Cookies from 'js-cookie';
import { LoadUser } from '@/services/user';
import React from 'react';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/default';
import Oidc from 'oidc-client';
import tokenFonfig from '@/configs/IdentityServer4Config';
const loginmgr = new Oidc.UserManager(tokenFonfig);

//#region InitialState
/**
 * 权限相关必须要用的东西,自己去改函数名
 */
export const getInitialState = async (): Promise<{
  currentUser?: Types.CurrentUser;
  settings?: LayoutSettings;
  // settingDrawer?: SettingDrawerProps;
}> => {
  console.log(history.location);
  console.log(history.location.pathname);
  debugger;

  if (history.location.pathname.search('/login') != -1) {
    console.log(tokenFonfig);
    loginmgr.signinRedirect(tokenFonfig);
    return { settings: defaultSettings };
  } else if (history.location.pathname.search('/callback') != -1) {
    try {
      debugger;
      let userid: string = Cookies.get('userId') ?? '';
      let response: Types.AjaxResult = await LoadUser({ id: userid });
      const userInfo: Types.UserTable = response.data;
      const { nickName } = userInfo;

      const menustr = window.localStorage.getItem('menu');
      let menu = [];
      let menulist = [];
      if (menustr != 'undefined') {
        menu = menustr ? JSON.parse(menustr) : [];
      }
      if (menu.length <= 0) {
        let menuRes: any = await MenuAsyncAPI();
        const { data } = menuRes;
        menu = data;
        window.localStorage.setItem('menu', JSON.stringify(menu));
      }
      if (menulist.length <= 0) {
        let menulists: any = await MenuListAsync();
        const { data } = menulists;
        window.localStorage.setItem('menulist', JSON.stringify(data));
      }
      return {
        currentUser: { name: nickName ?? '默认用户名', userid, avatar: AvatarGif, access: menu },
        settings: defaultSettings
      };
    } catch (error) {
      history.push('/login');
      throw error;
    }
  }
  return { settings: defaultSettings };
};

//#endregion

//#region Layout配置
/**
 * 运行时Layout配置
 * @param param
 */
export const layout = ({ initialState }: { initialState: { settings?: LayoutSettings; currentUser?: Types.CurrentUser } }): BasicLayoutProps => {
  return {
    logo: <img src={LogoPng} style={{ borderRadius: 7, marginLeft: 12, marginRight: 6 }} />,
    siderWidth: 220,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    disableMobile: true,
    menuHeaderRender: undefined,
    onPageChange: () => {
      // 如果没有登录并且不在登录页，重定向到 login
      if (!initialState?.currentUser?.userid && history.location.pathname !== '/login') history.push('/login');
    },
    ...initialState?.settings
  };
};
//#endregion

//#region Request配置

/**
 * 运行时request配置
 */
export const request: RequestConfig = {
  // timeout: 10000,
  // 接口符合RESTful API的时候就可以用errorHandler来处理
  // 当接口不规范时,采用配置errorConfig的方式来实现错误提示.
  errorConfig: {
    adaptor: (res: any) => {
      return {
        data: res.data || res.result,
        success: res.ok || res.Success || res.success,
        errorMessage: res.message || res.msg || res.Message,
        errorCode: res.code || res.type,
        showType: ErrorShowType.NOTIFICATION
      };
    }
  },
  prefix: BaseUrl,
  credentials: 'include',
  // 中间件
  middlewares: [],
  // 请求拦截器
  requestInterceptors: [
    (url: string, options) => {
      options.headers = { Authorization: `Bearer ${Cookies.get('accessToken') ?? ''}` };
      return { url, options };
    }
  ],
  // 响应拦截器
  responseInterceptors: []
};
//#endregion
