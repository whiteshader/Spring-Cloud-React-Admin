/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type RoleType = {
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: number;
  deptCheckStrictly: number;
  status: string;
  delFlag: string;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
  menuIds: [];
};

export type RoleListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type RoleListData = {
  list: RoleType[];
  pagination: Partial<RoleListPagination>;
};

export type RoleListParams = {
  roleId?: string;
  roleName?: string;
  roleKey?: string;
  roleSort?: string;
  dataScope?: string;
  menuCheckStrictly?: string;
  deptCheckStrictly?: string;
  status?: string;
  delFlag?: string;
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
