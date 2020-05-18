import 'reflect-metadata';

import { AjaxResult } from '@/dto/operationdto';
import { IUserService } from './IUserService';
import { PageData } from '@/dto/pagedto';
import { Pagination } from '@/dto/pagequerydto';
import { UserBaseApi } from '@/apis';
import { UserTable } from '@/dto/userdto';
import { injectable } from 'inversify';

@injectable()
class UserService implements IUserService {
  GetPage = (_query: Pagination): Promise<PageData<UserTable>> => UserBaseApi.GetPage(_query);

  LoadUser = async (param: any): Promise<UserTable> => (await UserBaseApi.LoadUser(param)).Data;

  GetSelectRole = (): Promise<AjaxResult> => UserBaseApi.GetSelectRole();

  FormSubmit = (param: any): Promise<AjaxResult> => UserBaseApi.UserSubmit(param);

  DeleteUser = (id: string): Promise<AjaxResult> => UserBaseApi.DeleteUser(id);
}

export default UserService;
