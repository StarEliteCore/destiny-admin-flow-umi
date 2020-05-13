import { DeviceStatisticAPI, FloorPowerConsumptionAPI, TimeIntervalPowerAPI } from '../services/service';
import { Effect, Reducer } from 'umi';

const getInstallDeviceCount = (fixData: { [x: string]: any }) => {
  let installDeviceCount = 0;
  for (let key in fixData) {
    installDeviceCount += Number(fixData[key]);
  }
  return installDeviceCount;
};
const getOnlineState = (onlineData: { [x: string]: any }) => {
  let lighting = 0;
  let sensor = 0;
  let switchPanel = 0;
  for (let key in onlineData) {
    if (key.indexOf('灯') !== -1) lighting += Number(onlineData[key]);
    else if (key.indexOf('传感') !== -1) sensor += Number(onlineData[key]);
    else if (key.indexOf('开关') !== -1) switchPanel += Number(onlineData[key]);
    else if (key.indexOf('面板') !== -1) switchPanel += Number(onlineData[key]);
  }
  return { switchPanel, lighting, sensor };
};
const getDeviceNumOfUse = (usageData: { [x: string]: any }) => {
  let lighting = 0;
  let switchPanel = 0;
  for (let key in usageData) {
    if (key.indexOf('灯') !== -1) lighting += Number(usageData[key]);
    else if (key.indexOf('开关') !== -1) switchPanel += Number(usageData[key]);
    else if (key.indexOf('面板') !== -1) switchPanel += Number(usageData[key]);
  }
  return { switchPanel, lighting };
};

export interface DeviceboardModelState {
  floorPowerConsumptionData: Array<any>;
  powerConsumptionUnit: string;
  installedDeviceCount: number;
  installedDevice: Array<any>;
  onlineState: { switchPanel: number; lighting: number; sensor: number };
  deviceNumOfUse: { switchPanel: number; lighting: number };
  timeIntervalPower: any;
  consumptionUnit: string;
}
interface DeviceboardModelType {
  namespace: 'deviceboard';
  state: DeviceboardModelState;
  effects: {
    fetchFloorPowerConsumption: Effect;
    fetchDeviceStatistic: Effect;
    fetchDTimeIntervalPower: Effect;
  };
  reducers: {
    saveFloorPowerConsumption: Reducer<any>;
    saveInstalledDeviceInfo: Reducer<any>;
    saveTimeIntervalPower: Reducer<any>;
  };
}

const DeviceboardModel: DeviceboardModelType = {
  namespace: 'deviceboard',
  state: {
    floorPowerConsumptionData: [],
    powerConsumptionUnit: '',
    installedDeviceCount: 0,
    installedDevice: [],
    onlineState: { switchPanel: 0, lighting: 0, sensor: 0 },
    deviceNumOfUse: { switchPanel: 0, lighting: 0 },
    timeIntervalPower: [],
    consumptionUnit: ''
  },
  effects: {
    *fetchFloorPowerConsumption({ callback }, { call, put }) {
      const response = yield call(FloorPowerConsumptionAPI);
      if (!!response && response.code === 1000) {
        const { result } = response;
        let temp = '';
        if (result && result.length > 0) temp = result[0].powerConsumptionUnit;
        yield put({ type: 'saveFloorPowerConsumption', payload: result, powerConsumptionUnit: temp });
        if (callback) callback({ state: true, msg: response.msg });
      } else if (callback) callback({ state: false, msg: '请求失败' });
    },
    *fetchDeviceStatistic({ callback }, { call, put }) {
      const response = yield call(DeviceStatisticAPI);
      if (!!response && response.code === 1000) {
        const { result } = response;
        let installedDeviceCount = getInstallDeviceCount(result.fixData);
        let installedDevice = result.fixData;
        let onlineState = getOnlineState(result.onlineData);
        let deviceNumOfUse = getDeviceNumOfUse(result.usageData);
        yield put({ type: 'saveInstalledDeviceInfo', payload: { installedDeviceCount, installedDevice, onlineState, deviceNumOfUse } });
        if (callback) callback({ state: true, msg: response.msg });
      } else if (callback) callback({ state: false, msg: '请求失败' });
    },
    *fetchDTimeIntervalPower({ callback }, { call, put }) {
      const response = yield call(TimeIntervalPowerAPI);
      if (!!response && response.code === 1000) {
        const { result } = response;
        let temp = '';
        if (result && result.length > 0) temp = result[0].consumptionUnit;
        yield put({ type: 'saveTimeIntervalPower', payload: result, consumptionUnit: temp });
        if (callback) callback({ state: true, msg: response.msg });
      } else if (callback) callback({ state: false, msg: '请求失败' });
    }
  },
  reducers: {
    saveFloorPowerConsumption(state, { payload, powerConsumptionUnit }) {
      return { ...state, floorPowerConsumptionData: payload, powerConsumptionUnit };
    },
    saveInstalledDeviceInfo(state, { payload }) {
      return { ...state, installedDeviceCount: payload.installedDeviceCount, installedDevice: payload.installedDevice, onlineState: payload.onlineState, deviceNumOfUse: payload.deviceNumOfUse };
    },
    saveTimeIntervalPower(state, { payload, consumptionUnit }) {
      return { ...state, timeIntervalPower: payload, consumptionUnit };
    }
  }
};
export default DeviceboardModel;
