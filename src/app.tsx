// src/app.ts 运行时配置文件,属于约定文件,无法更改文件名.里边的内容也需要根据开发文档定义以及使用.

import { BasicLayoutProps, Settings as ProSettings } from '@ant-design/pro-layout';
import { RequestConfig, history, useModel } from 'umi';

import Footer from '@/components/Footer';
import { MainManager } from './ioc/manager/manager';
import React from 'react';
import RightContent from '@/components/RightContent';
import { UserTable } from './dto/userdto';
import avatar from '@/assets/avatar.svg';
import defaultSettings from '../config/default.config';

// const {
//   auth: { userId, accessToken }
// } = useModel('useAuthModel');

// export async function getInitialState(): Promise<{
//   currentUser?: API.CurrentUser;
//   settings?: ProSettings;
// }> {
//   // 如果是登录页面，不执行
//   if (history.location.pathname !== '/login') {
//     try {
//       const userInfo: UserTable = await MainManager.Instance().UserService.LoadUser({ id: useModel('useAuthModel').auth.userId });
//       const { userName, id } = userInfo;
//       let currentUser: API.CurrentUser = { name: userName, userid: id, avatar, access: 'admin' };
//       return {
//         currentUser,
//         settings: defaultSettings
//       };
//     } catch (error) {
//       history.push('/login');
//     }
//   }
//   return { settings: defaultSettings };
// }

export const layout = ({ initialState }: { initialState: { settings?: ProSettings } }): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: false,
    ...initialState?.settings
  };
};

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。'
// };

/**
 * 异常处理程序
 */
// const errorHandler = (error: { response: Response }): Response => {
//   const { response } = error;
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;
//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText
//     });
//   } else if (!response) {
//     notification.error({
//       description: '您的网络发生异常，无法连接服务器',
//       message: '网络异常'
//     });
//   }
//   return response;
// };

export const request: RequestConfig = {
  // timeout: 1000,
  // 当接口规范时,采用配置errorHandler的方式来实现错误提示.按理说威威大佬的应该是 RESTful API,
  // errorHandler,
  // 当接口不规范时,采用配置errorConfig的方式来实现错误提示.谁特么知道威威大佬的不是标准的RESTful API,
  errorConfig: {
    adaptor: (res: any) => {
      return {
        ...res,
        success: res.ok || res.Success || res.success, //  resData.ok || resData.code === 1000
        errorMessage: res.message || res.msg || res.Message
      };
    },
    errorPage: '1'
  },
  prefix: 'http://localhost:50003/api/',
  credentials: 'include',
  middlewares: [],
  requestInterceptors: [
    (url: string, options) => {
      // localStorage.setItem('date', Date.now().toString());
      // const token = localStorage.getItem('userToken');
      options.headers = { Authorization: `Bearer ${useModel('useAuthModel').auth.accessToken}` };
      return { url, options };
    }
  ],
  responseInterceptors: []
};
