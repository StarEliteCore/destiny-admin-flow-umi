//返回分页数据
export interface IServcerReturn<T> {
    Success: boolean;
    Total: number;
    ItemList: T;
    Message: string;
}

//返回树形数据
export interface IServcerTreeReturn
{
    Success: boolean;
    Data: any;
    Message: string;
}

