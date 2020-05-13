import { IServcerReturn } from '../../dto/pagequerydto/serverReturndto';
import { UserTable } from '../../dto/userdto/UserDto';
import { Pagination } from '../../dto/pagequerydto/querydto';
import { AjaxResult } from '../../dto/operationdto/AjaxResult';

export interface IUserService {
    GetPage(_query: Pagination): Promise<IServcerReturn<UserTable[]>>;
    LoadUser(param: any): Promise<AjaxResult>;

    GetSelectRole(): Promise<AjaxResult>;

    FormSubmit(param: any): Promise<AjaxResult>;

    DeleteUser(id: string): Promise<AjaxResult>;
} 