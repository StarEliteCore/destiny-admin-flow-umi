import { Guid } from 'guid-typescript';

export class AuthDto {
  accessToken: string = '';
  nickName: string = '';
  userId: string = Guid.EMPTY;
  accessExpires: number = 0;
}
