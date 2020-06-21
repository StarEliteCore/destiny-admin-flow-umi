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
}
