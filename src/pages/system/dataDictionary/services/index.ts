import { DataDictionaryApi } from '@/apis';
import { request } from 'umi';

/**
 * 获取数据字典数据
 */

export const GetDataDictionary = (): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(DataDictionaryApi.getTreeDataDictionary, {
    method: 'GET'
  });
export const GetDataDictionaryLoad = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(DataDictionaryApi.getLoadDataDictionary, {
    params: param,
    method: 'GET'
  });
/**
 * 添加数据字典
 */
export const AddDataDictionary = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(DataDictionaryApi.createDataDictionary, {
    data: param,
    method: 'POST'
  });

export const UpdateDataDictionary = (param: any): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(DataDictionaryApi.updateDataDictionary, {
    data: param,
    method: 'POST'
  });
export const DelDataDictionary = (param: { id: string }): Promise<Types.AjaxResult> =>
  request<Types.AjaxResult>(DataDictionaryApi.deleteDataDictionary, {
    params: param,
    method: 'DELETE'
  });
