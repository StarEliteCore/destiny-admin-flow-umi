import { Guid } from 'guid-typescript';

export type AuthDto = {
  accessToken: string;
  nickName: string;
  userId: Guid;
  accessExpires: number;
};
