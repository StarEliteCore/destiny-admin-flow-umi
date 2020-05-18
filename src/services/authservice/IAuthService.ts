import { AuthDto } from '@/dto/authdto/authDto';

export interface IAuthService {
  Login({ userName, password }: { userName: string; password: string }): Promise<AuthDto>;
}
