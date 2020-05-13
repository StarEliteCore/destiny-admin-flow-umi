import { Apis } from '@/configs/apis';
import { request } from 'umi';

/**
 * 登录API
 * @param params
 */
export const LoginAPI = async (params: any): Promise<any> =>
  request(Apis.user.login, {
    data: params,
    headers: {}
  });

/**
 * 获取用户信息
 */
export const GetAccountAPI = async (): Promise<any> => request(Apis.user.getAccount);
