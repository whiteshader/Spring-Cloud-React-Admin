/* eslint-disable @typescript-eslint/dot-notation */
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { history } from 'umi';
import { message, notification } from 'antd';
import { clearSessionToken, getAccessToken, getRefreshToken, getTokenExpireTime } from '../access';
import { LoginPageUrl } from './utils';
import defaultSettings from '../../config/defaultSettings';

const codeMessage: Record<number, string> = {
  10000: '系统未知错误，请反馈给管理员',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

function createClient () {
  /** 配置request请求时的默认参数 */
  return extend({
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
    prefix: defaultSettings.apiBasePath
  });
}

const request = createClient();

// 更换令牌的时间区间
const checkRegion = 5 * 60 * 1000;

request.interceptors.request.use((url: string, options: any) => {
  // console.log('-------------------------')
  console.log('request:', url);
  const headers = options.headers ? options.headers : [];
  if (headers['Authorization'] === '' || headers['Authorization'] == null) {
    const expireTime = getTokenExpireTime();
    if (expireTime) {
      const left = Number(expireTime) - new Date().getTime();
      const refreshToken = getRefreshToken();
      if (left < checkRegion && refreshToken) {
        if (left < 0) {
          clearSessionToken();
          history.push(LoginPageUrl);
        }
      } else {
        const accessToken = getAccessToken();
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
    } else {
      clearSessionToken();
      history.push(LoginPageUrl);
      return undefined;
    }
    // console.log(headers)
    return {
      url,
      options: { ...options, headers },
    };
  } else {
    return {
      url,
      options,
    };
  }
});

// 响应拦截器
request.interceptors.response.use(async (response: Response) => {
  const { status } = response;
  if (status === 401 || status === 403) {
    const msg = codeMessage[status] || codeMessage[10000]
    message.warn(`${status} ${msg}`)
  }
  //  else if (status === 200) {
  //   const contentType = response.headers.get('content-type');
  //   const isJson = contentType?.includes('application/json');
  //   if (isJson === true) {
  //     const resp = response.clone();
  //     const data = await resp.json();
  //     if (data) {
  //       const { code } = data;
  //       if (code && code !== 200) {
  //         const msg = data.msg || codeMessage[code] || codeMessage[10000]
  //         message.warn(`${code} ${msg}`)
  //       }
  //     }
  //   }
  // }
  return response;
});

export default request;
