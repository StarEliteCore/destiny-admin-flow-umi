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
