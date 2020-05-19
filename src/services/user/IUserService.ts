import { UserTable } from '@/dto/userdto';

export interface IUserService {
  LoadUser(param: any): Promise<UserTable>;
}
