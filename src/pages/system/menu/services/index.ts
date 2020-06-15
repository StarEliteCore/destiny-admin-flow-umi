import { MenuApi } from '@/apis';
import { request } from 'umi';

export const GetPage = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getPageData, {
    data: param,
    method: 'POST'
  });
