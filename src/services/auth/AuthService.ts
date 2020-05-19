import 'reflect-metadata';

import { AuthBaseApi } from '@/apis';
import { AuthDto } from '@/dto/authdto';
import { IAuthService } from './IAuthService';
import { injectable } from 'react-inversify';

@injectable()
class AuthService implements IAuthService {
  Login = async ({ userName, password }: { userName: string; password: string }): Promise<AuthDto> => (await AuthBaseApi.Login({ userName, password })).Data;
}

export default AuthService;
