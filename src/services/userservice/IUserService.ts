import { AjaxResult } from '@/dto/operationdto';
import { IServicerReturn } from '@/dto/pagequerydto';
import { Pagination } from '@/dto/pagequerydto';
import { UserTable } from '@/dto/userdto';

export interface IUserService {
  GetPage(_query: Pagination): Promise<IServicerReturn<Array<UserTable>>>;

  LoadUser(param: any): Promise<UserTable>;

  GetSelectRole(): Promise<AjaxResult>;

  FormSubmit(param: any): Promise<AjaxResult>;

  DeleteUser(id: string): Promise<AjaxResult>;
}
