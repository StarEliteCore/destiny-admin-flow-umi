const defaultConsts = {
  userManagement: {
    defaultAdminUserName: 'admin'
  },
  appBaseUrl: 'http://localhost:8848', //前端站点
  token_root: 'http://localhost:50001', //IdentityServer4站点
  response_type: 'id_token token', //
  scope: 'openid profile roles Destiny.Core.Flow.API'
};
export default defaultConsts;
