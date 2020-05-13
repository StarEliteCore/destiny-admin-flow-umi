///分页数据
export class PageData<TData> {


    //数据
    ItemList: TData[] = [];

    ///总数量
    Total: number = 0;

    Success: boolean = true;

    Message: string = "查询成功";

    // public pageIndex:number=1;
    // public pageSize:number=15;
}