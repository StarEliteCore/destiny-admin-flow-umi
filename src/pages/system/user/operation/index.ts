import { FilterConnect } from '@/enumerate';

const operationProps = {
  PageIndex: 1,
  PageSize: 10,
  OrderConditions: [
    //   {
    //     SortField: '',
    //     SortDirection: '0 or 1'
    //   }
  ],
  Filter: {
    // 链接条件and、or
    FilterConnect: FilterConnect.AND,
    Conditions: [
      {
        Field: 'Name',
        Value: '123',
        Operator: '0 1 2 3 4 5 6 7' //过滤条件,
        // QueryFilter: ''
      }
    ]
    // Filters: [
    //   {
    //     FilterConnect: '0 1 ',
    //     Conditions: [
    //       {
    //         Field: 'Name',
    //         Value: '123',
    //         Operator: '0 1 2 3 4 5 6 7', //过滤条件,
    //         // QueryFilter: ''
    //       }
    //     ]
    //   }
    // ]
  }
};

export const fixValue = (values: any) => {
  for (let key in values) {
    let item;
    switch (key) {
      case 'pageIndex':
        operationProps.PageIndex = values[key];
        break;
      case 'pageSize':
        operationProps.PageSize = values[key];
        break;
      default:
    }
  }
};
