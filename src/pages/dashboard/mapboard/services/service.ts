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
