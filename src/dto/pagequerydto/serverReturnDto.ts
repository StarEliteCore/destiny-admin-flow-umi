//返回分页数据
export interface IServicerReturn<T> {
  Success: boolean;
  Total: number;
  ItemList: T;
  Message: string;
}

//返回树形数据
export interface IServicerTreeReturn {
  Success: boolean;
  Data: any;
  Message: string;
}
