import { IServicerTreeReturn } from '@/dto/pagequerydto';
import { MenuApi } from '@/configs/apis';
import { MenuPageDto } from '@/dto/menudto';
import { PageData } from '@/dto/pagedto';
import { request } from 'umi';

class MenuBaseApi {
  static GetTree = (param: any): Promise<IServicerTreeReturn> =>
    request<IServicerTreeReturn>(MenuApi.GetAuthorityTree, {
      data: param,
      method: 'GET'
    });

  static GetData = (): Promise<PageData<MenuPageDto>> =>
    request<PageData<MenuPageDto>>(MenuApi.GetAuthorityPageData, {
      method: 'GET'
    });
}

export default MenuBaseApi;
