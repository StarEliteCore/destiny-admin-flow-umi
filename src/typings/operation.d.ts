import { FilterConnect } from '@/enumerate';

export interface OrderCondition {
  SortField: string;
  SortDirection: FilterConnect;
}

export interface Filter {}

export interface Operation {
  PageIndex: number;
  PageSize: number;
  OrderConditions?: Array<OrderCondition>;
  Filter?: {
    // 链接条件and、or
    FilterConnect: FilterConnect.AND;
    Conditions: [
      {
        Field: 'Name';
        Value: '123';
        Operator: '0 1 2 3 4 5 6 7'; //过滤条件,
        // QueryFilter: ''
      }
    ];
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
  };
}
