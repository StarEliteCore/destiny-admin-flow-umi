import { MenuTypeEnum } from '@/pages/system/menu/models/MenuTypeEnum';
declare namespace MenuDto {
  export interface MenuTable {
    id: string;
    name?: string;
    description?: string;
    path?: string;
    sort?: number;
    parentNumber: string;
    depth: number;
    icon?: string;
    component?: string;
    parentId: string;
    type: MenuTypeEnum;
    children?: [];
  }
  export interface MenuOutputLoadDto {
    id: string;
    name?: string;
    description?: string;
    path?: string;
    sort?: number;
    depth: number;
    icon?: string;
    component?: string;
    functionIds: Array<string>;
    parentNumber: string;
    parentId: string;
  }

  export interface MenuFunctionTable {
    functionId: string;
    name: string;
    linkUrl: string;
    description: string;
  }
  /**
   * 权限分配树形Dto
   */
  export interface MenuTreeOutDto {
    key: string;
    title: string;
    children: [];
  }
  export interface MenuType {
    key: MenuTypeEnum;
    value: string;
  }
}
