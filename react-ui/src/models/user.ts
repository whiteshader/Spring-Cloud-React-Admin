import type { Effect, Reducer } from 'umi';
import { getUserInfo } from '@/services/user';
import { matchPermission } from '@/utils/permission';

export type CurrentUser = {
  avatar?: string;
  userName?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userId?: string;
  unreadCount?: number;
  roles?: string[];
  permissions: string[];
  authList?: any;
  hasPerms: any;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    initSession: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    clearSession: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      avatar: '',
      userName: '',
      title: '',
      group: '',
      signature: '',
      tags: [],
      userId: '',
      unreadCount: 0,
      roles: [''],
      permissions: [''],
      authList: '',
      hasPerms: () => {
        return false;
      },
    },
  },

  effects: {
    *initSession(_, { call, put }) {
      const response = yield call(getUserInfo);
      if (response && response.code !== 200) {
        yield put({
          type: 'login/logout',
        });
        yield put({
          type: 'routers/clearCurrentMenuRouters',
        });
      } else {
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      const user = { ...action.payload.user };
      user.permissions = action.payload.permissions;
      user.roles = action.payload.roles;
      user.hasPerms = (perms: any) => {
        return matchPermission(user.permissions, perms);
      };
      return {
        ...state,
        currentUser: user,
      };
    },
    clearSession(state) {
      const currentUser = {
        avatar: '',
        userName: '',
        title: '',
        group: '',
        signature: '',
        tags: [],
        userId: '',
        unreadCount: 0,
        roles: [''],
        permissions: [''],
        authList: '',
        hasPerms: () => {
          return false;
        },
      };
      return {
        ...state,
        currentUser,
      };
    },
    changeNotifyCount(state) {
      return {
        ...state,
      };
    },
  },
};

export default UserModel;
