declare namespace Types {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface AjaxResult {
    message: string;
    success: boolean;
    type: number;
    data: any;
  }

  export interface AuthDto {
    accessToken: string;
    nickName: string;
    userId: string;
    accessExpires: number;
  }

  export interface UserTable {
    id: string;
    userName: string;
    nickName: string;
    createdTime: string;
    isSystem: boolean;
    lastModifierTime: string;
    isDeleted: boolean;
    description: string;
    sex: number;
  }
}
