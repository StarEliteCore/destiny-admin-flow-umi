import { FunctionApi } from '@/apis';
import { request } from 'umi';

export const GetFunctionPage = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(FunctionApi.getPageFunction, {
    data: param,
    method: 'POST'
  });

export const AddFunction = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(FunctionApi.addFunction, {
    data: param,
    method: 'POST'
  });
