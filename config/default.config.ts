// Ant Design Pro的主题相关配置信息.具体信息参考文档

import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  primaryColor: '#F5222D',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: { locale: true },
  title: 'Destiny Admin Flow',
  pwa: false,
  iconfontUrl: ''
};

export type { DefaultSettings };

export default proSettings;
