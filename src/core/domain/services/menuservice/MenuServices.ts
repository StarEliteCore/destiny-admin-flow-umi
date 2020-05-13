import { injectable } from "inversify"
import "reflect-metadata"
import { IServcerTreeReturn } from "../../dto/pagequerydto/serverReturndto";
import { IMenuService } from "./IMenuserveces"
import {MenuOutTreeDto, MenuPageDto} from "@/core/domain/dto/menudto/MenuResultDto"
import MenuApiBase from "@/core/data-source/requestapi/menuapi/menurequestApi"
import { PageData } from '../../dto/pageDto/pageListDto';


@injectable()
export default class MenuService implements IMenuService {
    /**
     * 获取菜单权限分配时
     */
    async GetTree(param:any): Promise<IServcerTreeReturn> {
        var datas=MenuApiBase.GetTree(param);
        this.Recursivelogic((await datas).Data)
        return datas;
    }
    /**
     * 
     * @param data 处理树形数据判断是父级全选还是半选
     */
    private Recursivelogic(data:any){
        function Tree(crr:any)
        {
            crr.forEach((element: any) => {
                var Ischeck=[];
                let arr=element.children;
                arr.forEach((arrmodel: any) => {
                    if(arrmodel.checked)
                    {
                        Ischeck.push(arrmodel);
                    }
                });
                if(Ischeck.length<arr.length)
                {
                    element.checked=false
                }
                if(arr.length>0)
                {
                    Tree(arr);
                }
            });
        }
        Tree(data);
    }
    async GetData():Promise<PageData<MenuPageDto>>{
       return MenuApiBase.GetData();
    }

    // GetPage(_query: Pagination): Promise<IServcerReturn<Role>> {
    //     debugger
    //     return RoleserviceBase.GetUserPage(_query);
    // };

}
