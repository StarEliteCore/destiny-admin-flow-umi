import { OrganiztionApi } from '@/apis';
import {request} from 'umi';

export const GetOrfanization = (): Promise<Types.AjaxResult> => 
    request<Types.AjaxResult>(OrganiztionApi.getOrganiztion,{
        method:'GET'
    });