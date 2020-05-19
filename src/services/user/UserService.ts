import 'reflect-metadata';

import { IUserService } from './IUserService';
import { UserBaseApi } from '@/apis';
import { UserTable } from '@/dto/userdto';
import { injectable } from 'react-inversify';

@injectable()
class UserService implements IUserService {
  LoadUser = async (param: any): Promise<UserTable> => (await UserBaseApi.LoadUser(param)).Data;
}

export default UserService;
