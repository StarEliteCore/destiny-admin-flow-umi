# typings 文件夹

数据传输对象(DTO)(Data Transfer Object)，是一种设计模式之间传输数据的软件应用系统。数据传输目标往往是数据访问对象从数据库中检索数据。数据传输对象与数据交互对象或数据访问对象之间的差异是一个以不具有任何行为除了存储和检索的数据（访问和存取器）。该文件夹中的文件主要用于存放数据实体的定义,如:

推荐使用 <http://json2ts.com/> 来进行自动转化

```typescript
export interface AjaxResult {
  message: string;
  success: boolean;
  type: AjaxResultType;
  data: any;
}

export enum AjaxResultType {
  /// <summary>
  /// 消息结果
  /// </summary>
  Info = 203,
  /// <summary>
  /// 成功
  /// </summary>
  Success = 200,
  /// <summary>
  /// 错误
  /// </summary>
  Error = 500,
  /// <summary>
  /// 未经授权
  /// </summary>
  Unauthorized = 401,
  /// <summary>
  /// 已登录但权限不足
  /// </summary>
  Uncertified = 403,
  /// <summary>
  /// 功能资源找不到
  /// </summary>
  NoFound = 404
}
```
