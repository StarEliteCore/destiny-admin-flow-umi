import appconst from '@/configs/appconst';

const IdentityServer4tokenCofig = {
  authority: appconst.token_root,
  client_id: 'DestinyCoreFlowReactClient',
  redirect_uri: appconst.appBaseUrl + '/callback',
  response_type: appconst.response_type,
  scope: appconst.scope,
  post_logout_redirect_uri: appconst.appBaseUrl + '/login'
};
export default IdentityServer4tokenCofig;
