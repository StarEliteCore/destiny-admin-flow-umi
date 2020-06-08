export class TreeModel<TData> implements Types.ListResult<TData>, Types.ResultBase {
  constructor() {}
  //   constructor(public itemList: TData[], public success: boolean, public message: string) {
  //     this.itemList = itemList;
  //     this.success = success;
  //     this.message = message;
  //   }
  itemList: TData[];
  success: boolean;
  message?: string;
}
