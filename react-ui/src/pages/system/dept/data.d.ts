
/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type DeptType = {
  deptId: number;
  parentId: number;
  ancestors: string;
  deptName: string;
  orderNum: number;
  leader: string;
  phone: string;
  email: string;
  status: string;
  delFlag: string;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
};

export type DeptListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type DeptListData = {
  list: DeptType[];
  pagination: Partial<DeptListPagination>;
};

export type DeptListParams = {
  deptId?: string;
  parentId?: string;
  ancestors?: string;
  deptName?: string;
  orderNum?: string;
  leader?: string;
  phone?: string;
  email?: string;
  status?: string;
  delFlag?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
