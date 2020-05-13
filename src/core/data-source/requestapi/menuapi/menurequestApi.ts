import requsest from '@/utils/request.ts'
import { MenuApiInfo } from '@/core/apiconfig/ApiRouter.ts'
import { IServcerTreeReturn } from '@/core/domain/dto/pagequerydto/serverReturndto.ts'
import { MenuOutTreeDto, MenuPageDto } from '@/core/domain/dto/menudto/MenuResultDto'
import { PageData } from '@/core/domain/dto/pageDto/pageListDto';

export default class MenuApiBase {
    /*
        _query查询条件
     */
    static GetTree(param:any): Promise<IServcerTreeReturn> {
        return new Promise((resolve, reject) => {
            requsest.get(MenuApiInfo.GetAuthorityTree,{params:param}).then((response: any) => {
                resolve(response);
            })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }
    /**
     * 查询
     */
    static GetData():Promise<PageData<MenuPageDto>>{
        return new Promise((resolve,reject) => {
            requsest.get(MenuApiInfo.GetAuthorityPageData).then((Response: any) => 
            { resolve(Response);}).catch((error: any) => {
                reject(error)
            })
           
        })
    }
}