declare namespace OrganizationDto{
    export interface OrganizationTable{
        id:string;
        title?:string;
        expand?:boolean;
        disabled?:string;
        depth?:string;
        parentId?:string;
        parenNumber?:string;
        firstLeader?:string;
        secondLeader?:string;
        children?:[];
    }

    export interface OrganizationInputDto{
        id:string;
        parentId:string;
        name:string;
        ladingCadre:string;
        parentNumber:string;
        depth:number;
        firstLeader:Guid;
        secondLeader:Guid;
    }
}