export class FilterItem {
  constructor(operator: FilterOperator = FilterOperator.Equal, connect: FilterConnect = FilterConnect.And) {
    this.Operator = operator;
    this.Connect = connect;
  }

  Operator!: FilterOperator;
  Connect!: FilterConnect;
}

export class FilterInfo {
  constructor(key: string, value: object, operator: FilterOperator = FilterOperator.Equal, connect: FilterConnect = FilterConnect.And) {
    this.Key = key;
    this.Value = value;
    this.Operator = operator;
    this.Connect = connect;
  }

  Key!: string;
  Value!: object;
  Operator!: FilterOperator;
  Connect!: FilterConnect;
}

export enum FilterOperator {
  Equal = 0,
  GreaterThan = 1,
  GreaterThanOrEqual = 2,
  LessThan = 3,
  LessThanOrEqual = 4,
  NotEqual = 5,

  Like = 7
}

export enum FilterConnect {
  And = 0,
  Or = 1
}
