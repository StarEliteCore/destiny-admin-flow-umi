declare namespace DataDictionaryDto {
    // 数据字典表格
    export interface DataDictionaryTable {
        id: string;
        title?: string;
        value?: string;
        remark?: string;
        sort?: number;
        parentId: string;
        children?: [];
    }
    export interface DataOutputLoadDto {
        id: string;
        title?: string;
        value?: string;
        remark?: string;
        sort?: number;
        parentId: string;
    }
}