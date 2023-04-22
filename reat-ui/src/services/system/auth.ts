import { request } from '@umijs/max';

export async function getCaptchaImg(params?: Record<string, any>, options?: Record<string, any>) {
  return request('/api/captchaImage', {
    method: 'GET',
    params: {
      ...params,
    },
    headers: {
      isToken: false,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      isToken: false,
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


// 获取手机验证码
export async function getMobileCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
