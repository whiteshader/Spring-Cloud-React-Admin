import type { Effect, Reducer } from 'umi';
import { getRouters, getSubRouters } from '@/services/routers';

export type MenuItemMeta = {
  title: string;
  icon: string;
  noCache: boolean;
  link: string;
};

export type RoutersMenuItemType = {
  alwaysShow?: boolean;
  children?: RoutersMenuItemType[];
  component?: string;
  hidden?: boolean;
  meta: MenuItemMeta;
  name: string;
  path: string;
  redirect?: string;
  [key: string]: any;
};

export type MenuRoutersModelState = {
  menuRouters?: RoutersMenuItemType[];
};

export type MenuRoutersModelType = {
  namespace: 'routers';
  state: MenuRoutersModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    clear: Effect;
  };
  reducers: {
    saveCurrentMenuRouters: Reducer<MenuRoutersModelState>;
    clearCurrentMenuRouters: Reducer<MenuRoutersModelState>;
  };
};

const MenuRoutersModel: MenuRoutersModelType = {
  namespace: 'routers',

  state: {
    menuRouters: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getRouters);
      yield put({
        type: 'saveCurrentMenuRouters',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getRouters);
      const menulist = getSubRouters(response.data, '');
      yield put({
        type: 'saveCurrentMenuRouters',
        payload: menulist,
      });
    },
    *clear(_, { put }) {
      yield put({
        type: 'clearCurrentMenuRouters',
      });
    },
  },

  reducers: {
    clearCurrentMenuRouters(state) {
      return {
        ...state,
        menuRouters: [],
      };
    },
    saveCurrentMenuRouters(state, action) {
      return {
        ...state,
        menuRouters: action.payload || {},
      };
    },
  },
};

export default MenuRoutersModel;
