
/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type JobLogType = {
  jobLogId: number;
  jobName: string;
  jobGroup: string;
  invokeTarget: string;
  jobMessage: string;
  status: string;
  exceptionInfo: string;
  createTime: Date;
};

export type JobLogListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type JobLogListData = {
  list: JobLogType[];
  pagination: Partial<JobLogListPagination>;
};

export type JobLogListParams = {
  jobLogId?: string;
  jobName?: string;
  jobGroup?: string;
  invokeTarget?: string;
  jobMessage?: string;
  status?: string;
  exceptionInfo?: string;
  createTime?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
