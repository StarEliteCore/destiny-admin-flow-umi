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
}
