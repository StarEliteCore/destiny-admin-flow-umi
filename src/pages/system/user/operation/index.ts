import { Conditions, Operation } from '@/interface';
import { FilterConnect, FilterOperator } from '@/enumerate';

export const fixValue = (values: any): Operation => {
  let operationProps: Operation = {
    pageIndex: 1,
    pageSize: 10,
    filter: {
      filterConnect: FilterConnect.AND,
      conditions: []
    }
  };
  for (let key in values) {
    switch (key) {
      case 'pageIndex':
      case 'PageIndex':
        operationProps.pageIndex = values[key];
        break;
      case 'pageSize':
      case 'PageSize':
        operationProps.pageSize = values[key];
        break;
      default:
        let item: Conditions = {
          field: key,
          value: values[key],
          operator: FilterOperator.LIKE
        };
        operationProps.filter?.conditions.push(item);
    }
  }
  return operationProps;
};
