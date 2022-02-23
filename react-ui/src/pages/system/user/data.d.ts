
/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type UserType = {
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: Date;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
  admin: boolean; 
  params: any;
  postIds: any;
  roleId: number
  roleIds: [];
  roles: [];
  searchValue: string;
};

export type UserListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type UserListData = {
  list: UserType[];
  pagination: Partial<UserListPagination>;
};

export type UserListParams = {
  userId?: string;
  deptId?: string;
  userName?: string;
  nickName?: string;
  userType?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  avatar?: string;
  password?: string;
  status?: string;
  delFlag?: string;
  loginIp?: string;
  loginDate?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
