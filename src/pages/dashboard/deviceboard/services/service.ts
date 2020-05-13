import { Apis } from '@/configs/apis';
import { request } from 'umi';

/**
 * 获取楼层电量统计
 * @param {Json} params 参数
 */
export const FloorPowerConsumptionAPI = async (params: any): Promise<any> =>
  request(Apis.databoard.floorPowerConsumption, {
    data: params
  });
/**
 * 获取设备数据
 * @param {Json} params 参数
 */
export const DeviceStatisticAPI = async (params: any): Promise<any> =>
  request(Apis.databoard.deviceStatistic, {
    data: params
  });
/**
 * 获取各时段电量统计
 * @param {Json} params 参数
 */
export const TimeIntervalPowerAPI = async (params: any): Promise<any> =>
  request(Apis.databoard.timeIntervalPower, {
    data: params
  });
