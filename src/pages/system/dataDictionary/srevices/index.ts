import { DataDictionaryApi } from '@/apis';
import { request } from 'umi';

/**
 * 获取数据字典数据
 */

export const GetDataDictionary = (): Promise<Types.AjaxResult> =>
    request<Types.AjaxResult>(DataDictionaryApi.getTreeDataDictionary, {
        method: 'GET'
    });
