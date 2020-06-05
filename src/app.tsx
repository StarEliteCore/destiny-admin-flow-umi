// src/app.ts 运行时配置文件,属于约定文件,无法更改文件名.里边的内容也需要根据开发文档定义以及使用.

import { AvatarGif, LogoPng } from '@/assets';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { RequestConfig, history } from 'umi';

import { BaseUrl } from '@/configs';
import Cookies from 'js-cookie';
import { LoadUser } from '@/services/user';
import React from 'react';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/default';

//#region InitialState
/**
 * 权限相关必须要用的东西,自己去改函数名
 */
export const getInitialState = async (): Promise<{
  currentUser?: Types.CurrentUser;
  settings?: LayoutSettings;
  // settingDrawer?: SettingDrawerProps;
}> =>
  await new Promise(async (resolve, reject) => {
    if (history.location.pathname !== '/login') {
      let userid: string = Cookies.get('userId') ?? '';
      await LoadUser({ id: userid })
        .then((response) => {
          const userInfo: Types.UserTable = response.data;
          const { nickName } = userInfo;
          resolve({
            currentUser: { name: nickName ?? '默认用户名', userid, avatar: AvatarGif, access: 'admin' },
            settings: defaultSettings
            // settingDrawer: {
            //   hideCopyButton: true,
            //   hideHintAlert: true
            // }
          });
        })
        .catch((error) => {
          history.push('/login');
          reject(error);
        });
    } else {
      resolve({ settings: defaultSettings });
    }
  });
//#endregion

//#region Layout配置
/**
 * 运行时Layout配置
 * @param param
 */
export const layout = ({ initialState }: { initialState: { settings?: LayoutSettings } }): BasicLayoutProps => {
  return {
    logo: <img src={LogoPng} style={{ borderRadius: 7, marginLeft: 12, marginRight: 6 }} />,
    siderWidth: 208,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    disableMobile: true,
    menuHeaderRender: undefined,
    ...initialState?.settings
  };
};
//#endregion

//#region Request配置
/**
 * CodeMessage
 */
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   405: '请求方法不被允许。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。'
// };

/**
 * 运行时request配置
 */
export const request: RequestConfig = {
  // timeout: 10000,
  // 接口符合RESTful API的时候就可以用errorHandler来处理,若不是就注释掉吧!
  // errorHandler: (error: { response: Response }) => {
  //   const { response } = error;
  //   if (response && response.status) {
  //     const errorText = codeMessage[response.status] || response.statusText;
  //     const { status, url } = response;
  //     notification.error({ message: `请求错误 ${status}: ${url}`, description: errorText });
  //   }
  //   if (!response) {
  //     notification.error({ message: '网络异常', description: '您的网络发生异常，无法连接服务器' });
  //   }
  //   throw error;
  // },
  // 当接口不规范时,采用配置errorConfig的方式来实现错误提示.
  errorConfig: {
    adaptor: (res: any) => {
      return {
        data: res.data || res.result,
        success: res.ok || res.Success || res.success,
        errorMessage: res.message || res.msg || res.Message,
        errorCode: res.code || res.type
      };
    },
    errorPage: '1'
  },
  prefix: BaseUrl,
  credentials: 'include',
  // 中间件
  middlewares: [],
  // 请求拦截器
  requestInterceptors: [
    (url: string, options) => {
      Cookies.set('date', Date.now().toString(), { path: '/' });
      options.headers = { Authorization: `Bearer ${Cookies.get('accessToken') ?? ''}` };
      return { url, options };
    }
  ],
  // 响应拦截器
  responseInterceptors: []
};
//#endregion
