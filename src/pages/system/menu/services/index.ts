import { MenuApi } from '@/apis';
import { request } from 'umi';

export const GetPage = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getPageData, {
    method: 'GET'
  });
