/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type DictTypeType = {
  dictId: number;
  dictName: string;
  dictType: string;
  status: string;
  createBy: string;
  createTime: date;
  updateBy: string;
  updateTime: date;
  remark: string;
};

export type DictTypeListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type DictTypeListData = {
  list: DictTypeType[];
  pagination: Partial<DictTypeListPagination>;
};

export type DictTypeListParams = {
  dictId?: string;
  dictName?: string;
  dictType?: string;
  status?: string;
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
