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
  return request(`/system/user/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询用户信息详细
export function getUser(userId: number) {
  return request(`/system/user/${userId}`, {
    method: 'GET',
  });
}

// 新增用户信息
export async function addUser(params: UserType) {
  return request('/system/user', {
    method: 'POST',
    data: params,
  });
}

// 修改用户信息
export async function updateUser(params: UserType) {
  return request('/system/user', {
    method: 'PUT',
    data: params,
  });
}

// 删除用户信息
export async function removeUser(ids: string) {
  return request(`/system/user/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出用户信息
export function exportUser(params?: UserListParams) {
  return downLoadXlsx(`/system/user/export`, { params }, `user_${new Date().getTime()}.xlsx`);
}

export function updateUserProfile(data: API.CurrentUser) {
  return request('/system/user/profile', {
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword
  }
  return request('/system/user/profile/updatePwd', {
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data: any) {
  return request('/system/user/profile/avatar', {
    method: 'post',
    data: data
  })
}