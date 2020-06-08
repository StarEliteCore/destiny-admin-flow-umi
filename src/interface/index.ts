import { FilterConnect, FilterOperator } from '@/enumerate';

export interface OrderCondition {
  SortField: string;
  SortDirection: FilterConnect;
}

export interface Filter {
  FilterConnect: FilterConnect;
  Conditions: Array<Conditions>;
  Filters?: Array<Filter>;
}

export interface Conditions {
  Field?: string;
  Value?: any;
  Operator?: FilterOperator; //过滤条件,
  QueryFilter?: '';
}

export interface Operation {
  PageIndex: number;
  PageSize: number;
  OrderConditions?: Array<OrderCondition>;
  Filter?: Filter;
}
