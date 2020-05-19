// src/app.ts 运行时配置文件,属于约定文件,无法更改文件名.里边的内容也需要根据开发文档定义以及使用.

import { BasicLayoutProps, Settings as ProSettings } from '@ant-design/pro-layout';
import { RequestConfig, history, useModel } from 'umi';

import { AjaxResult } from '@/dto/ajaxdto';
import Footer from '@/components/Footer';
import { LoadUser } from '@/services/user';
import React from 'react';
import RightContent from '@/components/RightContent';
import { UserTable } from '@/dto/userdto';
import avatar from '@/assets/avatar.svg';
import defaultSettings from '../config/default';
import errorHandler from '@/utils/requesterror';
import logo from '@/assets/logo.svg';

/**
 * 权限相关必须要用的东西,自己去改函数名
 */
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: ProSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/login') {
    try {
      console.log();
      const response: AjaxResult = await LoadUser({ id: useModel('useAuthModel').auth.userId });
      const userInfo: UserTable = response.data;
      const { userName, id } = userInfo;
      let currentUser: API.CurrentUser = { name: userName, userid: id, avatar, access: 'admin' };
      return {
        currentUser,
        settings: defaultSettings
      };
    } catch (error) {
      // history.push('/login');
    }
  }
  return { settings: defaultSettings };
}

/**
 * 运行时Layout配置
 * @param param
 */
export const layout = ({ initialState }: { initialState: { settings?: ProSettings } }): BasicLayoutProps => {
  return {
    logo,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: false,
    ...initialState?.settings
  };
};

/**
 * 运行时request配置
 */
export const request: RequestConfig = {
  timeout: 10000,
  // 当接口规范时,采用配置errorHandler的方式来实现错误提示.按理说威威大佬的应该是 RESTful API,
  errorHandler,
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
      // options.headers = { Authorization: `Bearer ${''}` };
      return { url, options };
    }
  ],
  responseInterceptors: []
};
