// src/app.ts 运行时配置文件,属于约定文件,无法更改文件名.里边的内容也需要根据开发文档定义以及使用.

import { AvatarGif, LogoPng } from '@/assets';
import { BasicLayoutProps, Settings as LayoutSettings, SettingDrawerProps } from '@ant-design/pro-layout';
import { RequestConfig, history } from 'umi';

import Cookies from 'js-cookie';
import Footer from '@/components/Footer';
import { LoadUser } from '@/services/user';
import React from 'react';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/default';
import { notification } from 'antd';

//#region InitialState
/**
 * 权限相关必须要用的东西,自己去改函数名
 */
export async function getInitialState(): Promise<{
  currentUser?: Types.CurrentUser;
  settings?: LayoutSettings;
  settingDrawer?: SettingDrawerProps;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/login') {
    try {
      let settingDrawer: SettingDrawerProps = {
        hideHintAlert: true,
        hideCopyButton: true
      };
      let userId: string = Cookies.get('userId') ?? '';
      const response: Types.AjaxResult = await LoadUser({ id: userId });
      const userInfo: Types.UserTable = response.data;
      const { userName } = userInfo;
      let currentUser: Types.CurrentUser = { name: userName ?? '默认用户名', userid: Cookies.get('userId'), avatar: AvatarGif, access: 'admin' };
      return {
        currentUser,
        settings: defaultSettings,
        settingDrawer
      };
    } catch (error) {
      console.log('getInitialState:', error);
      history.push('/login');
    }
  }
  return { settings: defaultSettings };
}
//#endregion

//#region Layout配置
/**
 * 运行时Layout配置
 * @param param
 */
export const layout = ({ initialState }: { initialState: { settings?: LayoutSettings } }): BasicLayoutProps => {
  return {
    logo: <img src={LogoPng} style={{ borderRadius: 7, marginLeft: 12, marginRight: 6 }} />,
    rightContentRender: () => <RightContent />,
    disableContentMargin: true,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    // breadcrumbRender: (routers = []) => [
    //   {
    //     path: '/',
    //     breadcrumbName: '首页'
    //   },
    //   ...routers
    // ],
    ...initialState?.settings
  };
};
//#endregion

//#region Request配置
/**
 * CodeMessage
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

/**
 * 运行时request配置
 */
export const request: RequestConfig = {
  timeout: 10000,
  // 当接口规范时,采用配置errorHandler的方式来实现错误提示.
  errorHandler: (error: { response: Response }) => {
    const { response } = error;
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;
      notification.error({ message: `请求错误 ${status}: ${url}`, description: errorText });
    }
    if (!response) {
      notification.error({ description: '您的网络发生异常，无法连接服务器', message: '网络异常' });
    }
    throw error;
  },
  // 当接口不规范时,采用配置errorConfig的方式来实现错误提示.
  errorConfig: {
    adaptor: (res: any) => {
      return {
        ...res,
        success: res.ok || res.Success || res.success,
        errorMessage: res.message || res.msg || res.Message
      };
    },
    errorPage: '1'
  },
  prefix: 'http://localhost:5000/api/',
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
