import { createIcon } from '@/utils/IconUtil';
import request from '@/utils/request'
import type { MenuDataItem } from '@umijs/route-utils';

/** 获取当前的用户 GET /getUserInfo */
export async function getUserInfo (options?: Record<string, any>) {
  return request<API.GetUserInfoResult>('/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /login/outLogin */
export async function logout (options?: Record<string, any>) {
  return request<Record<string, any>>('/logout', {
    method: 'POST',
    ...(options || {}),
  });
}


export async function getRouters(): Promise<API.GetRoutersResult> {
  return request('/getRouters');
}

export function convertCompatRouters(childrens: API.RoutersMenuItem[]): MenuDataItem[] {
  return childrens.map((item: API.RoutersMenuItem) => {
    return {
      path: item.path,
      icon: createIcon(item.meta.icon),
      name: item.meta.title,
      routes: item.children ? convertCompatRouters(item.children) : undefined,
      hideChildrenInMenu: item.hidden,
      hideInMenu: item.hidden,
      component: item.component,
      authority: item.perms,
    };
  });
}

export async function getRoutersInfo(): Promise<MenuDataItem[]> {
  return getRouters().then((res) => {
    return convertCompatRouters(res.data);
  });
}

export function getMatchMenuItem(path: string, menuData: MenuDataItem[]|undefined): MenuDataItem[] {
  if(!menuData)
    return [];
  let items: MenuDataItem[] = [];
  menuData.forEach((item) => {
    if (item.path) {
      if (item.path === path) {
        items.push(item);
        return;
      }
      if (path.length >= item.path?.length) {
        const exp = `${item.path}/*`;
        if (path.match(exp)) {
          if(item.routes) {
            const subpath = path.substr(item.path.length+1);
            const subItem: MenuDataItem[] = getMatchMenuItem(subpath, item.routes);
            items = items.concat(subItem);
          } else {
            const paths = path.split('/');
            if(paths.length >= 2 && paths[0] === item.path && paths[1] === 'index') {
              items.push(item);
            }
          }
        }
      }
    }
  });
  return items;
}
