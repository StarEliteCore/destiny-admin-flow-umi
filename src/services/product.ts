import { Apis } from '@/configs/apis';
import { request } from 'umi';

/**
 * 获取设备类型列表
 */
export const DeviceTypeAPI = async (): Promise<any> => request(Apis.product.deviceType);
