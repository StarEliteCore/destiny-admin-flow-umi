import { FilterConnect, FilterOperator } from '@/enumerate';

export interface OrderCondition {
  SortField: string;
  SortDirection: FilterConnect;
}

export interface Filter {
  filterConnect: FilterConnect;
  conditions: Array<Conditions>;
  filters?: Array<Filter>;
}

export interface Conditions {
  field?: string;
  value?: any;
  operator?: FilterOperator; //过滤条件,
  queryFilter?: '';
}

export interface Operation {
  pageIndex: number;
  pageSize: number;
  orderConditions?: Array<OrderCondition>;
  filter?: Filter;
}
