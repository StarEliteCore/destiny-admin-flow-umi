import { Button, Result } from 'antd';
import { Dispatch, Link, connect } from 'umi';
import ProLayout, { MenuDataItem, BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';

import Authorized from '@/utils/Authorized';
import { ConnectState } from '@/models/connect';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';

/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="很抱歉，您无权访问此页面."
    extra={
      <Button type="primary">
        <Link to="/login">返回登陆</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

// const defaultFooterDom = (
//   <DefaultFooter
//     copyright="Winside.com, 2019-2020 All Rights Reserved."
//     links={[
//       {
//         key: 'help',
//         title: '帮助',
//         blankTarget: true,
//         href: ''
//       },
//       {
//         key: 'privacy',
//         title: '隐私',
//         blankTarget: true,
//         href: ''
//       },
//       {
//         key: 'provisions',
//         title: '条款',
//         blankTarget: true,
//         href: ''
//       }
//     ]}
//   />
// );

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/'
    }
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) dispatch({ type: 'user/fetchCurrent' });
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) dispatch({ type: 'global/changeLayoutCollapsed', payload });
  };

  // get children authority
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined
  };

  // const {} = useIntl();
  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, _) => (
        <Link to="/" style={{ justifyContent: 'center' }}>
          {logoDom}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页'
        },
        ...routers
      ]}
      itemRender={(route, _, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? <Link to={paths.join('/')}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;
      }}
      // footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings
}))(BasicLayout);
