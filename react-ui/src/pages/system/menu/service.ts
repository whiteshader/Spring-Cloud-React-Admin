import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { MenuType, MenuListParams } from './data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询菜单权限列表
export async function getMenuList(params?: MenuListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/api/system/menu/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询菜单权限详细
export function getMenu(menuId: number) {
  return request(`/api/system/menu/${menuId}`, {
    method: 'GET',
  });
}

// 查询菜单权限详细
export function getMenuTree() {
  return request('/api/system/menu/treeselect', {
    method: 'GET',
  });
}

// 新增菜单权限
export async function addMenu(params: MenuType) {
  return request('/api/system/menu', {
    method: 'POST',
    data: params,
  });
}

// 修改菜单权限
export async function updateMenu(params: MenuType) {
  return request('/api/system/menu', {
    method: 'PUT',
    data: params,
  });
}

// 删除菜单权限
export async function removeMenu(ids: string) {
  return request(`/api/system/menu/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出菜单权限
export function exportMenu(params?: MenuListParams) {
  return downLoadXlsx(`/api/system/menu/export`, { params }, `menu_${new Date().getTime()}.xlsx`);
}
