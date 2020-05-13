import { IServcerTreeReturn } from '../../dto/pagequerydto/serverReturndto';
import { Pagination } from '../../dto/pagequerydto/querydto';
import {MenuOutTreeDto, MenuPageDto} from "@/core/domain/dto/menudto/MenuResultDto"
import { PageData } from '../../dto/pageDto/pageListDto';

export interface IMenuService {
    GetTree(param:any): Promise<IServcerTreeReturn>;
    GetData():Promise<PageData<MenuPageDto>>;
} 