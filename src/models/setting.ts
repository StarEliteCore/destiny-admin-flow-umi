import defaultConfig, { DefaultSettings } from '../../config/default.config';

import { Reducer } from 'umi';

interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
  const root = document.getElementById('root');
  if (root) root.className = colorWeak ? 'colorWeak' : '';
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultConfig,
  reducers: {
    changeSetting(state = defaultConfig, { payload }) {
      const { colorWeak, contentWidth } = payload;
      if (state.contentWidth !== contentWidth && window.dispatchEvent) window.dispatchEvent(new Event('resize'));
      updateColorWeak(!!colorWeak);
      return { ...state, ...payload };
    }
  }
};
export default SettingModel;
