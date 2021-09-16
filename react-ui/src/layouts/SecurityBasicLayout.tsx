/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch } from 'umi';
import { FormattedMessage } from 'umi';
import { Redirect } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
// import { getMatchMenu } from '@umijs/route-utils';
import { getAccessToken, clearToken } from '@/utils/authority';
import { getMatchMenuItem, getRoutersData } from '@/services/routers';
import logo from '../assets/logo.svg';
import { createIcon } from '@/utils/IconUtil';

/**
 *
 * @author whiteshader@163.com
 *
 * */

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle={
      <FormattedMessage
        id="pages.authorized.forbiden"
        defaultMessage="Sorry, you are not authorized to access this page."
      />
    }
    extra={
      <Button type="primary" onClick={() => history.goBack()}>
        <FormattedMessage id="pages.goback" defaultMessage="Go Back" />
      </Button>
    }
  />
);

export type SecurityBasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  currentUser: CurrentUser;
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: SecurityBasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'ruoyi-react',
        title: <GithubOutlined />,
        href: 'https://gitee.com/whiteshader/ruoyi-react',
        blankTarget: true,
      },
      {
        key: 'Ruoyi React',
        title: 'Ruoyi React',
        href: 'https://gitee.com/whiteshader/ruoyi-react',
        blankTarget: true,
      },
    ]}
  />
);

const SecurityBasicLayout: React.FC<SecurityBasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    loading,
    location = {
      pathname: '/',
    },
    currentUser,
  } = props;

  const [isReady, setIsReady] = useState<boolean>(false);

  const [remoteMenuData, setRemoteMenuData] = useState<MenuDataItem[]>([]);
  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      setIsReady(true);
      dispatch({
        type: 'user/initSession',
      });
    }
  }, [dispatch]);

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  /** Use Authorized check all menu item */
  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map((item) => {
      const localItem = {
        ...item,
        icon: createIcon(item.icon),
        children: item.children ? menuDataRender(item.children) : undefined,
      };
      // console.log(localItem)
      return Authorized.check(currentUser, item.authority, localItem, null) as MenuDataItem;
    });

  const accessToken = getAccessToken();
  const isLogin = !!accessToken;
  const queryString = new URLSearchParams({ redirect: window.location.href }).toString();

  const { formatMessage } = useIntl();

  const authorized = useMemo(() => {
    if (location.pathname === '/') {
      return { authority: undefined };
    }
    const item = getMatchMenuItem(location.pathname || '/', remoteMenuData).pop() || {
      authority: '!*',
    };
    return item;
  }, [location, remoteMenuData]);

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }
  if (!isLogin && window.location.pathname !== '/user/login') {
    clearToken();
    return <Redirect to={`/user/login?${queryString}`} />;
  }

  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }
          return (
            <Fragment>
              {createIcon(menuItemProps.icon)} <Link to={menuItemProps.path}>{defaultDom}</Link>
            </Fragment>
          );
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        menu={{
          locale: false,
          request: async (): Promise<MenuDataItem[]> => {
            const res = await getRoutersData();
            setRemoteMenuData(res);
            // console.log(params, defaultMenuData);
            return res;
          },
        }}
        // itemRender={(route, params, routes, paths) => {
        //   const first = routes.indexOf(route) === 0;
        //   return first ? (
        //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        //   ) : (
        //     <span>{route.breadcrumbName}</span>
        //   );
        // }}
        footerRender={() => {
          if (settings.footerRender || settings.footerRender === undefined) {
            return defaultFooterDom;
          }
          return null;
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch} currentUser={currentUser}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, user, loading, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  currentUser: user.currentUser,
  settings,
  loading: loading.models.user,
}))(SecurityBasicLayout);
