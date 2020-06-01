// src/app.ts 运行时配置文件,属于约定文件,无法更改文件名.里边的内容也需要根据开发文档定义以及使用.

import { AvatarGif, LogoPng } from '@/assets';
import { BaseUrl, ExpiredTime } from '@/configs';
import { BasicLayoutProps, Settings as LayoutSettings, SettingDrawerProps } from '@ant-design/pro-layout';
import { RequestConfig, history } from 'umi';
import { message, notification } from 'antd';

import Cookies from 'js-cookie';
import Footer from '@/components/Footer';
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
  settingDrawer?: SettingDrawerProps;
}> => {
  try {
    // 如果是登录页面，不执行
    if (history.location.pathname !== '/login') {
      let userid: string = Cookies.get('userId') ?? '';
      const response: Types.AjaxResult = await LoadUser({ id: userid });
      const userInfo: Types.UserTable = response.data;
      const { nickName } = userInfo;
      return {
        currentUser: { name: nickName ?? '默认用户名', userid, avatar: AvatarGif },
        settings: defaultSettings,
        settingDrawer: {
          hideCopyButton: true,
          hideHintAlert: true
        }
      };
    } else {
      const perDate: undefined | string = Cookies.get('date');
      const isExpired = Date.now() - parseInt(perDate ?? '0') < ExpiredTime;
      if (!isExpired) {
        message.info('登陆信息已过期,请重新登陆.');
        history.push('/login');
      }
    }
  } catch (error) {
    history.push('/login');
  }
  return { settings: defaultSettings };
};
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
      notification.error({ message: '网络异常', description: '您的网络发生异常，无法连接服务器' });
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
  prefix: BaseUrl,
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
