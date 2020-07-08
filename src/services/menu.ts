import { MenuApi } from '@/apis';
import { request } from 'umi';

export const MenuAsyncAPI = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(MenuApi.getMenuAsync, {
    method: 'GET'
  });
