import request from '@/utils/request';
import type { RoutersMenuItemType } from '@/models/routers';
import type { MenuDataItem } from '@umijs/route-utils';

export async function getRouters(): Promise<any> {
  return request('/api/getRouters');
}

export function getSubRouters(childrens: RoutersMenuItemType[], path: string): MenuDataItem[] {
  const menuslist = childrens.map((item) => {
    return {
      path: path.length > 0 ? `${path}/${item.path}` : item.path,
      icon: item.meta.icon,
      name: item.meta.title,
      children: item.children ? getSubRouters(item.children, item.path) : undefined,
      // routes: item.children ? getSubRouters(item.children, item.path) : undefined,
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
    return getSubRouters(menus, '');
  });
}

export function getMatchMenuItem(path: string, menuData: MenuDataItem[]): MenuDataItem[] {
  let items: MenuDataItem[] = [];
  menuData.forEach((item) => {
    if (item.path) {
      if (item.path === path) {
        items.push(item);
      }
      if (path.length > item.path?.length) {
        const exp = `${item.path}/index`;
        if (path.match(exp)) {
          items.push(item);
        }
      }
    }
    if (item.children) {
      const subItem: MenuDataItem[] = getMatchMenuItem(path, item.children);
      items = items.concat(subItem);
    }
  });
  return items;
}
