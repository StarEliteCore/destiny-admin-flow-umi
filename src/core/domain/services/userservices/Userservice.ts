import { injectable } from "inversify"
import "reflect-metadata"
import { Pagination } from "@/core/domain/dto/pagequerydto/querydto.ts";

import { UserTable } from '../../dto/userdto/UserDto';
import { IUserService } from "./IUserservice"
import UserApiBase from "@/core/data-source/requestapi/userapi/userrequestApi.ts"
import { PageData } from '../../dto/pageDto/pageListDto';
import { AjaxResult } from '../../dto/operationdto/AjaxResult';


@injectable()
export default class UserService implements IUserService {
    async GetPage(_query: Pagination): Promise<PageData<UserTable>> {

        return UserApiBase.GetPage(_query);
    }
    async LoadUser(param: any): Promise<AjaxResult> {
        return UserApiBase.LoadUser(param);
    }

    async GetSelectRole(): Promise<AjaxResult> {
        return UserApiBase.GetSelectRole();

    }

    async FormSubmit(param: any): Promise<AjaxResult> {

        return UserApiBase.UserSubmit(param);

    }

    async DeleteUser(id: string): Promise<AjaxResult> {
        return UserApiBase.DeleteUser(id);

    }
    // Delete(): void { 


    // }

}