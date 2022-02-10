import request from 'umi-request';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha (
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 登录接口 POST /api/login/account */
export async function login (body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 获取验证码
export async function getCaptchaImage () {
  return request('/api/captchaImage', {
    headers: {
    },
  })
}

// 获取手机验证码
export async function getMobileCaptcha (mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
