export class AjaxResult {
    Message: string = "";
    Success: boolean = false;
    Type: AjaxResultType = AjaxResultType.Success;
    Data: any;
}

enum AjaxResultType {

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
