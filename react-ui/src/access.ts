/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/15
 * 
 * */

import type { MenuDataItem } from "@umijs/route-utils";
import { getMatchMenuItem } from "./services/session";
import { checkRole, matchPermission } from "./utils/permission";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access (initialState: { currentUser: API.CurrentUser | undefined, menus: MenuDataItem[] | undefined }) {
  const { currentUser, menus } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    hasPerms: (perm: string) => {
      return matchPermission(currentUser?.permissions, perm);
    },
    hasNoPerms: (perm: string) => {
      return !matchPermission(currentUser?.permissions, perm);
    },
    roleFiler: (route: {authority: string[]}) => {
      return checkRole(currentUser?.roles, route.authority);
    },
    authorize: (route: any) => {
      if(menus) {
        const items = getMatchMenuItem(route.path, menus);
        if(!items || items.length === 0){
          return false;
        } else {
          return true;
        }
      }
      return true;
    }, // initialState 中包含了的路由才有权限访问
  };
}

export function setSessionToken (
  access_token: string | undefined,
  refresh_token: string | undefined,
  expireTime: number,
): void {
  if (access_token) {
    localStorage.setItem('access_token', access_token);
  } else {
    localStorage.removeItem('access_token');
  }
  if (refresh_token) {
    localStorage.setItem('refresh_token', refresh_token);
  } else {
    localStorage.removeItem('refresh_token');
  }
  localStorage.setItem('expireTime', `${expireTime}`);
}

export function getAccessToken () {
  return localStorage.getItem('access_token');
}

export function getRefreshToken () {
  return localStorage.getItem('refresh_token');
}

export function getTokenExpireTime () {
  return localStorage.getItem('expireTime');
}

export function clearSessionToken () {
  sessionStorage.removeItem('user');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expireTime');
}
