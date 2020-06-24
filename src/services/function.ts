import { FunctionApi } from '@/apis';
import { request } from 'umi';

export const GetSelectFunc = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(FunctionApi.selectFunction, {
    method: 'GET'
  });
