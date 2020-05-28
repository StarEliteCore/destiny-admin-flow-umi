// Ant Design Pro的主题相关配置信息.具体信息参考文档

import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true
  },
  title: 'Destiny Flow',
  pwa: false,
  iconfontUrl: ''
} as LayoutSettings & {
  pwa: boolean;
};
