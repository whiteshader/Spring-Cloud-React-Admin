
import request from '@/utils/request'

/** 获取当前的用户 GET /api/getUserInfo */
export async function getUserInfo (options?: Record<string, any>) {
  return request<API.GetUserInfoResult>('/api/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function logout (options?: Record<string, any>) {
  return request<Record<string, any>>('/api/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
