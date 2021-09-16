import request from '@/utils/request';

export async function getUsers(): Promise<any> {
  return request('/api/users');
}

export async function getUserInfo(): Promise<any> {
  return request('/api/getInfo');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
