
/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type OperlogType = {
  operId: number;
  title: string;
  businessType: number;
  method: string;
  requestMethod: string;
  operatorType: number;
  operName: string;
  deptName: string;
  operUrl: string;
  operIp: string;
  operLocation: string;
  operParam: string;
  jsonResult: string;
  status: number;
  errorMsg: string;
  operTime: Date;
};

export type OperlogListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type OperlogListData = {
  list: OperlogType[];
  pagination: Partial<OperlogListPagination>;
};

export type OperlogListParams = {
  operId?: string;
  title?: string;
  businessType?: string;
  method?: string;
  requestMethod?: string;
  operatorType?: string;
  operName?: string;
  deptName?: string;
  operUrl?: string;
  operIp?: string;
  operLocation?: string;
  operParam?: string;
  jsonResult?: string;
  status?: string;
  errorMsg?: string;
  operTime?: string;
  pageSize?: string;
  current?: string;
  pageNum?: string;
  filter?: string;
  sorter?: string;
};
