import { Apis } from '@/configs/apis';
import { request } from 'umi';

/**
 * 获取区域部署数据API
 */
export const RegionDataAPI = async (params: any): Promise<any> =>
  request(Apis.project.regionData, {
    data: params
  });
