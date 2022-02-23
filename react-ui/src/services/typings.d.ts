// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Role = {
    admin: boolean;
    createBy: string;
    createTime: string;
    dataScope: string;
    delFlag: string;
    deptCheckStrictly: boolean;
    deptIds: string;
    flag: boolean;
    menuCheckStrictly: boolean;
    menuIds: string;
    params: any;
    remark: string;
    roleId: number;
    roleKey: string;
    roleName: string;
    roleSort: string;
    searchValue: string;
    status: string;
    updateBy: string;
    updateTime: string;
  };

  type Dept = {
    ancestors?: string;
    children: Array;
    delFlag?: string;
    deptId?: number;
    deptName?: string;
    email?: string;
    leader?: string;
    orderNum?: string;
    params: any;
    parentId?: number;
    parentName?: string;
    phone?: string;
    remark?: string;
    searchValue?: string;
    status?: string;
    createBy?: string;
    createTime?: Date;
    updateBy?: string;
    updateTime?: Date;
  };

  type CurrentUser = {
    avatar?: string;
    userName?: string;
    nickName?: string;
    userId?: string;
    sex?: string;
    email?: string;
    signature?: string;
    remark?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phonenumber?: string;
    dept?: Dept;
    roles?: Role[];
    permissions: string[];
  };

  type LoginResult = {
    code?: number;
    msg?: string;
    token?: string;
  };

  type GetUserInfoResult = {
    code?: number;
    msg?: string;
    permissions?: string[];
    roles?: string[];
    user?: CurrentUser;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    code?: string;
    uuid?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };


  type MenuItemMeta = {
    title: string;
    icon: string;
    noCache: boolean;
    link: string;
  };

  type RoutersMenuItem = {
    alwaysShow?: boolean;
    children?: RoutersMenuItem[];
    component?: string;
    hidden?: boolean;
    meta: MenuItemMeta;
    name: string;
    path: string;
    redirect?: string;
    [key: string]: any;
  };

  type GetRoutersResult = {
    code: number;
    msg: string;
    data: RoutersMenuItem[];
  };
}

