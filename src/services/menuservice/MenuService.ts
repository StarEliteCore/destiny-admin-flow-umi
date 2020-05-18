import { IMenuService } from './IMenuService';
import { IServicerTreeReturn } from '@/dto/pagequerydto';
import { MenuBaseApi } from '@/apis';
import { MenuPageDto } from '@/dto/menudto';
import { PageData } from '@/dto/pagedto';

class MenuService implements IMenuService {
  /**
   * 获取菜单权限分配时
   */
  GetTree = (param: any): Promise<IServicerTreeReturn> =>
    new Promise((resolve, reject) => {
      MenuBaseApi.GetTree(param)
        .then((data: IServicerTreeReturn) => {
          this.RecursiveLogic(data.Data);
          resolve(data);
        })
        .catch((error: any) => reject(error));
    });

  /**
   *
   * @param data 处理树形数据判断是父级全选还是半选
   */
  private RecursiveLogic = (data: any) => {
    const Tree = (crr: any) => {
      for (let index: number = 0, element: any; (element = crr[index++]); ) {
        let IsCheck = [];
        let arr = element.children;
        for (let index: number = 0, item: any; (item = arr[index++]); ) {
          if (item.checked) {
            IsCheck.push(item);
          }
        }
        if (IsCheck.length < arr.length) {
          element.checked = false;
        }
        if (arr.length > 0) {
          Tree(arr);
        }
      }
    };
    Tree(data);
  };

  GetData = (): Promise<PageData<MenuPageDto>> => MenuBaseApi.GetData();
}

export default MenuService;
