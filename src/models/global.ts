import { Reducer } from 'umi';

export interface GlobalModelState {
  collapsed: boolean;
}

interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: { collapsed: false },
  reducers: {
    changeLayoutCollapsed(state, { payload }): GlobalModelState {
      return { ...state, collapsed: payload };
    }
  }
};

export default GlobalModel;
