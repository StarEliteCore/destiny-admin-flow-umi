import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  primaryColor: '#F5222D',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
    defaultOpenAll: false
  },
  title: 'Destiny Flow',
  pwa: false,
  iconfontUrl: ''
} as LayoutSettings & {
  pwa: boolean;
};
