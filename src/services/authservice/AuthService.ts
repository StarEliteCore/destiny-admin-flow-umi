import { AuthBaseApi } from '@/apis';
import { AuthDto } from '@/dto/authdto/authDto';
import { IAuthService } from './IAuthService';

class AuthService implements IAuthService {
  Login = async ({ userName, password }: { userName: string; password: string }): Promise<AuthDto> => (await AuthBaseApi.Login({ userName, password })).Data;
}

export default AuthService;
