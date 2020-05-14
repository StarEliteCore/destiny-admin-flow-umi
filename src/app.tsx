import { BasicLayoutProps, Settings as ProSettings } from '@ant-design/pro-layout';
import { RequestConfig, history } from 'umi';

import Footer from '@/components/Footer';
import React from 'react';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/default.config';
import { queryCurrent } from './apis/UserBaseApi';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: ProSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    try {
      const currentUser = await queryCurrent();
      return {
        currentUser,
        settings: defaultSettings
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings
  };
}

export const layout = ({ initialState }: { initialState: { settings?: ProSettings } }): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: false,
    ...initialState?.settings
  };
};

export const request: RequestConfig = {
  // timeout: 1000,
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        ...resData,
        success: resData.ok, //  resData.ok || resData.code === 1000
        errorMessage: resData.message || resData.msg
      };
    },
    errorPage: '1'
  },
  prefix: 'http://localhost:50003/api/',
  credentials: 'include',
  middlewares: [],
  requestInterceptors: [
    (url: string, options) => {
      localStorage.setItem('date', Date.now().toString());
      const token = localStorage.getItem('userToken');
      options.headers = { Authorization: token ? token : '' };
      return { url, options };
    }
  ],
  responseInterceptors: []
};
