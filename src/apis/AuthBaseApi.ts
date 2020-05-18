import { AjaxResult } from '@/dto/operationdto';
import { AuthApi } from '@/configs/apis';
import { request } from 'umi';

class AuthBaseApi {
  static Login = (param: { userName: string; password: string }): Promise<AjaxResult> =>
    request<AjaxResult>(AuthApi.Login, {
      data: param,
      method: 'POST'
    });
}

export default AuthBaseApi;
