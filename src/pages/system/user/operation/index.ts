import { Conditions, Operation } from '@/interface';
import { FilterConnect, FilterOperator } from '@/enumerate';

export const fixValue = (values: any): Operation => {
  let operationProps: Operation = {
    PageIndex: 1,
    PageSize: 10,
    Filter: {
      FilterConnect: FilterConnect.AND,
      Conditions: []
    }
  };
  for (let key in values) {
    switch (key) {
      case 'pageIndex':
      case 'PageIndex':
        operationProps.PageIndex = values[key];
        break;
      case 'pageSize':
      case 'PageSize':
        operationProps.PageSize = values[key];
        break;
      default:
        let item: Conditions = {
          Field: key,
          Value: values[key],
          Operator: FilterOperator.LIKE
        };
        operationProps.Filter?.Conditions.push(item);
    }
  }
  return operationProps;
};
