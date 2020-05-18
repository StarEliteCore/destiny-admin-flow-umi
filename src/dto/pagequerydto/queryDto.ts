import { FilterInfo } from './filterInfoDto';

export class Pagination {
  PageIndex: number = 1;
  PageSize: number = 10;
  OrderConditions: OrderCondition[] = [];
  Filters: FilterInfo[] = [];
}
export class OrderCondition {
  SortDirection!: SortDirection;
  SortField!: string;
}

export enum SortDirection {
  Ascending = 0,
  Descending = 1
}
