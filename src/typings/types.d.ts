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
    access?: any;
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface AjaxResult {
    message?: string;
    success?: boolean;
    type?: number;
    data?: any;
    total?: number;
  }

  export interface AuthDto {
    accessToken?: string;
    nickName?: string;
    userId?: string;
    accessExpires?: number;
  }

  export enum Sex {
    man = 0,
    woman = 1
  }

  export interface UserEntry {
    userName?: string;
    nickName?: string;
    passwordHash?: string;
    createdTime?: string;
    isSystem?: boolean;
    description?: string;
    sex?: Sex;
    roleIds?: Array<string>;
    id?: string;
  }

  export interface UserTable {
    id?: string;
    userName?: string;
    nickName?: string;
    createdTime?: string;
    isSystem?: boolean;
    lastModifierTime?: string;
    isDeleted?: boolean;
    description?: string;
    sex?: number;
  }

  export interface UserOutputDto {
    userName?: string;
    nickName?: string;
    passwordHash?: string;
    createdTime?: string;
    isSystem?: boolean;
    description?: string;
    sex?: Sex;
    roleIds?: Array<string>;
    id?: string;
  }
  export interface RoleTable {
    id?: string;
    name?: string;
    isAdmin?: boolean;
    code?: string;
    description?: string;
    lastModifierTime?: string;
    createdTime?: string;
  }

  export interface Role {
    disabled?: boolean;
    group?: any;
    selected?: boolean;
    text?: string;
    value?: string;
  }

  export interface FunctionTable {
    id?: string;
    name?: string;
    description?: string;
    lastModifierTime?: string;
    createdTime?: string;
    controller?: string;
    action?: string;
    isEnabled?: boolean;
  }

  //  树数据模型

  export interface ResultBase {
    success: boolean;
    message: string;
  }

  export interface ListResult<TData> {
    itemList: TData[];
  }

  export interface TreeMenu {
    id: string = '';
    name: string = '';
    parentId: string = '';
    children: Array<TreeMenu> = [];
    key: string;
    title: string;
  }

  export enum AjaxResultType {
    info = 203,
    success = 200,
    error = 500
  }
}
