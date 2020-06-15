import { FilterConnect, FilterOperator } from '@/enumerate';

export interface OrderCondition {
  sortField: string;
  sortDirection: FilterConnect;
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

export class FilterInfo {
  constructor(conditions: ConditionInfo[], connect = FilterConnect.AND) {
    this.filterConnect = connect;
    this.conditions = conditions;
  }
  public filterConnect: FilterConnect = FilterConnect.AND;
  public conditions: Array<ConditionInfo>;
  public filters?: Array<FilterInfo>;
}

export class ConditionInfo {
  constructor(field: string, operator: FilterOperator = FilterOperator.EQUAL) {
    this.field = field;
    this.operator = operator;
  }
  public field: string = '';
  public operator: FilterOperator = FilterOperator.EQUAL;
}
