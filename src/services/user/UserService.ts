import { IUserService } from './IUserService';
import { UserBaseApi } from '@/apis';
import { UserTable } from '@/dto/userdto';

class UserService implements IUserService {
  LoadUser = async (param: any): Promise<UserTable> => (await UserBaseApi.LoadUser(param)).Data;
}

export default UserService;
