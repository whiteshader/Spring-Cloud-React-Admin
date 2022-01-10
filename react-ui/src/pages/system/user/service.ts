import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { UserType, UserListParams } from './data.d';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询用户信息列表
export async function getUserList(params?: UserListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/api/system/user/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询用户信息详细
export function getUser(userId: number) {
  return request(`/api/system/user/${userId}`, {
    method: 'GET',
  });
}

// 新增用户信息
export async function addUser(params: UserType) {
  return request('/api/system/user', {
    method: 'POST',
    data: params,
  });
}

// 修改用户信息
export async function updateUser(params: UserType) {
  return request('/api/system/user', {
    method: 'PUT',
    data: params,
  });
}

// 删除用户信息
export async function removeUser(ids: string) {
  return request(`/api/system/user/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出用户信息
export function exportUser(params?: UserListParams) {
  return downLoadXlsx(`/api/system/user/export`, { params }, `user_${new Date().getTime()}.xlsx`);
}

// 更新密码
export function resetPwd(params: any) {
  return request('/api/system/user/resetPwd', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      userId: params.userId,
      password: params.password,
    },
  });
}
