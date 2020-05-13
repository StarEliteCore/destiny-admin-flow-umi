import requsest from '@/utils/request.ts'
import { UserApiInfo } from '@/core/apiconfig/ApiRouter.ts'
import { Pagination } from '@/core/domain/dto/pagequerydto/querydto.ts'
import { IServcerReturn } from '@/core/domain/dto/pagequerydto/serverReturndto.ts'
import { UserTable } from '@/core/domain/dto/userdto/UserDto'
import { PageData } from '@/core/domain/dto/pageDto/pageListDto'
import { RoleApiInfo } from '@/core/apiconfig/ApiRouter';
import { AjaxResult } from '@/core/domain/dto/operationdto/AjaxResult'
export default class UserApiBase {
    /*
        _query查询条件
     */
    static GetPage(_query: Pagination): Promise<PageData<UserTable>> {
        return new Promise((resolve, reject) => {
            requsest.post(UserApiInfo.GetPageUser, _query).then((response: any) => {
                resolve(response);
            })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }
    static LoadUser(param: any): Promise<AjaxResult> {
        return new Promise((resolve, reject) => {
            requsest.get(UserApiInfo.LoadUser, { params: param })
                .then((response: any) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    }

    static GetSelectRole(): Promise<AjaxResult> {

        return new Promise((resolve, reject) => {
            requsest.get<any, AjaxResult>(RoleApiInfo.SelectRole)
                .then((result) => {
                    resolve(result);
                }).catch((error) => {

                    reject(error);

                });

        });

    }

    static UserSubmit(param: any): Promise<AjaxResult> {

        return new Promise((resolve, reject) => {
            requsest.post<any, AjaxResult>(UserApiInfo.AddOrUpdate, param)
                .then((result) => {
                    resolve(result);
                }).catch((error) => {

                    reject(error);

                });

        });

    }

    static DeleteUser(id: string): Promise<AjaxResult> {

        return new Promise((resolve, reject) => {
            requsest.delete<any, AjaxResult>(UserApiInfo.DeleteUser, {
                params: {
                    id: id
                }
            }).then((result) => {
                // debugger;
                // callback(result);
                resolve(result);
            }).catch((error) => {

                reject(error);

            });

        });
    }
}