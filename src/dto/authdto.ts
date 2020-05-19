import { Guid } from 'guid-typescript';

export interface AuthDto {
  accessToken: string;
  nickName: string;
  userId: Guid;
  accessExpires: number;
}
