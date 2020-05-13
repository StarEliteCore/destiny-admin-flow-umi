import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  primaryColor: '#F5222D',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: { locale: false },
  title: '重庆与展微电子',
  pwa: false,
  iconfontUrl: ''
};

export type { DefaultSettings };

export default proSettings;
