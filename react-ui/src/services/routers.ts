import request from '@/utils/request';
import type { RoutersMenuItemType } from '@/models/routers';
import type { MenuDataItem } from '@umijs/route-utils';

export async function getRouters(): Promise<any> {
  return request('/api/getRouters');
}

export function getSubRouters(childrens: RoutersMenuItemType[]): MenuDataItem[] {
  const menuslist = childrens.map((item) => {
    return {
      path: item.path,
      icon: item.meta.icon,
      name: item.meta.title,
      children: item.children ? getSubRouters(item.children) : undefined,
      hideChildrenInMenu: item.hidden,
      hideInMenu: item.hidden,
      component: item.component,
      authority: item.perms,
    };
  });
  return menuslist;
}

export async function getRoutersData(): Promise<MenuDataItem[]> {
  return request('/api/getRouters').then((res) => {
    const menus: RoutersMenuItemType[] = res.data;
    return getSubRouters(menus);
  });
}

export function getMatchMenuItem(path: string, menuData: MenuDataItem[]): MenuDataItem[] {
  let items: MenuDataItem[] = [];
  menuData.forEach((item) => {
    if (item.path) {
      if (item.path === path) {
        items.push(item);
      }
      if (path.length >= item.path?.length) {
        const exp = `${item.path}/*`;
        if (path.match(exp)) {
          if(item.children) {
            const subpath = path.substr(item.path.length+1);
            const subItem: MenuDataItem[] = getMatchMenuItem(subpath, item.children);
            items = items.concat(subItem);
          } else {
            const paths = path.split('/');
            if(paths.length === 2 && paths[0] === item.path && paths[1] === 'index') {
              items.push(item);
            }
          }
        }
      }
    }
  });
  return items;
}
