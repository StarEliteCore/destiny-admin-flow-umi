import { AuthDto } from '@/dto/authdto';

export interface IAuthService {
  Login({ userName, password }: { userName: string; password: string }): Promise<AuthDto>;
}
