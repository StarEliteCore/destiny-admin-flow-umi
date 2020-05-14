import { Guid } from 'guid-typescript';

export class Search {
  Name: string = '';
  IsAdmin: boolean = false;
}
/*
    表格Dto
*/
export class RolePageDto {
  id: string = Guid.EMPTY;
  Name: string = '';
  NormalizedName: string = '';
  IsAdmin: boolean = false;
  Description: string = '';
  Code: string = '';
  ConcurrencyStamp: string = '';
}
/**
 * 角色添加Dto
 */
export class RoleAddDto {
  Name: string = '';
  NormalizedName: string = '';
  IsAdmin: boolean = false;
  Description: string = '';
  Code: string = '';
  menuIds: Array<string> = [];
  Id: string = Guid.EMPTY;
}
