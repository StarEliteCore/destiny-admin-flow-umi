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
