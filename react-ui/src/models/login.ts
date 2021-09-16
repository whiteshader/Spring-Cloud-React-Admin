import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { getCaptchaImage, fakeAccountLogin } from '@/services/login';
import { setAuthority, clearToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  codeImage?: '';
  uuid?: '';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
    fetchCaptchaImage: Effect;
  };
  reducers: {
    updateCaptchaImage: Reducer<StateType>;
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // Login successfully
      if (response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      } else {
        const res = yield call(getCaptchaImage);
        const imgdata = `data:image/png;base64,${res.img}`;
        yield put({
          type: 'updateCaptchaImage',
          payload: { img: imgdata, uuid: res.uuid },
        });
      }
    },
    *logout(_, { put }) {
      clearToken();
      yield put({
        type: 'user/clearSession',
      });
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *fetchCaptchaImage(_, { call, put }) {
      const response = yield call(getCaptchaImage);
      const imgdata = `data:image/png;base64,${response.img}`;
      yield put({
        type: 'updateCaptchaImage',
        payload: { img: imgdata, uuid: response.uuid },
      });
    },
  },

  reducers: {
    updateCaptchaImage(state, { payload }) {
      return {
        ...state,
        codeImage: payload.img,
        uuid: payload.uuid,
      };
    },
    changeLoginStatus(state, { payload }) {
      const current = new Date();
      const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60);
      localStorage.setItem('expireTime', `${expireTime}`);
      setAuthority(payload.token, payload.token, expireTime);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        access_token: payload.token,
        refresh_token: payload.token,
        expireTime,
      };
    },
  },
};

export default Model;
