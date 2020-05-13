const pagesize: number[] = [10, 20, 50, 100];
///分页数据
export class PageComponentData {
    public Total: number = 0;
    public PasizeArr: number[] = pagesize;
    public PageRow: number = 10;
    public PageIndex: number = 1;
}

export class PaginationHandle {
    public Pagination: PageComponentData = new PageComponentData();
}