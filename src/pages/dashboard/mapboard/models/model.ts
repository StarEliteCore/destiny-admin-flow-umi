// import { DeviceStatisticAPI, FloorPowerConsumptionAPI, TimeIntervalPowerAPI } from '../services/service';
// import { Effect, Reducer } from 'umi';

export interface MapboardModelState {
  // floorPowerConsumptionData: Array<any>;
}
interface MapboardModelType {
  namespace: 'mapboard';
  state: MapboardModelState;
  effects: {
    // fetchFloorPowerConsumption: Effect;
  };
  reducers: {
    // saveFloorPowerConsumption: Reducer<any>;
  };
}

const MapboardModel: MapboardModelType = {
  namespace: 'mapboard',
  state: {
    // floorPowerConsumptionData: []
  },
  effects: {
    // *fetchFloorPowerConsumption({ callback }, { call, put }) {
    //   const response = yield call(FloorPowerConsumptionAPI);
    //   if (!!response && response.code === 1000) {
    //     const { result } = response;
    //     let temp = '';
    //     if (result && result.length > 0) temp = result[0].powerConsumptionUnit;
    //     yield put({ type: 'saveFloorPowerConsumption', payload: result, powerConsumptionUnit: temp });
    //     if (callback) callback({ state: true, msg: response.msg });
    //   } else if (callback) callback({ state: false, msg: '请求失败' });
    // },
  },
  reducers: {
    // saveFloorPowerConsumption(state, { payload, powerConsumptionUnit }) {
    //   return { ...state, floorPowerConsumptionData: payload, powerConsumptionUnit };
    // },
  }
};
export default MapboardModel;
