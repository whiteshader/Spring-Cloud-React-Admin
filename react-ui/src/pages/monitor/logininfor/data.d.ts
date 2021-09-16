
/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type LogininforType = {
  infoId: number;
  userName: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  status: string;
  msg: string;
  loginTime: Date;
};

export type LogininforListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type LogininforListData = {
  list: LogininforType[];
  pagination: Partial<LogininforListPagination>;
};

export type LogininforListParams = {
  infoId?: string;
  userName?: string;
  ipaddr?: string;
  loginLocation?: string;
  browser?: string;
  os?: string;
  status?: string;
  msg?: string;
  loginTime?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
