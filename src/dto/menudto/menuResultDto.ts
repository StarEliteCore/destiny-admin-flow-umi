import { Guid } from 'guid-typescript';

export class MenuOutTreeDto {
  id: string = '';
  title: string = '';
  expand: boolean = false;
  disabled: boolean = false;
  Depth: string = '';
  ParentId: string = '';
  ParenNumber: boolean = false;
  Children: any = [];
}
/**
 * 表格Dto
 */
export class MenuPageDto {
  id: string = Guid.EMPTY;
  Name: string = '';
  Sort: number = 0;
  RouterPath: string = '';
  ParentId: string = Guid.EMPTY;
  Icon: string = Guid.EMPTY;
  Depth: number = 0;
  Children: any = [];
}
