import { IServicerTreeReturn } from '@/dto/pagequerydto';
import { MenuPageDto } from '@/dto/menudto';
import { PageData } from '@/dto/pagedto';

export interface IMenuService {
  GetTree(param: any): Promise<IServicerTreeReturn>;
  GetData(): Promise<PageData<MenuPageDto>>;
}
