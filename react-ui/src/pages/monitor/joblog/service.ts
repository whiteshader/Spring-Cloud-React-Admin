import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { JobLogType, JobLogListParams } from './data.d';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询定时任务调度日志列表
export async function getJobLogList(params?: JobLogListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/monitor/jobLog/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询定时任务调度日志详细
export function getJobLog(jobJobLogId: number) {
  return request(`/monitor/jobLog/${jobJobLogId}`, {
    method: 'GET',
  });
}

// 新增定时任务调度日志
export async function addJobLog(params: JobLogType) {
  return request('/monitor/jobLog', {
    method: 'POST',
    data: params,
  });
}

// 修改定时任务调度日志
export async function updateJobLog(params: JobLogType) {
  return request('/monitor/jobLog', {
    method: 'PUT',
    data: params,
  });
}

// 删除定时任务调度日志
export async function removeJobLog(ids: string) {
  return request(`/monitor/jobLog/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出定时任务调度日志
export function exportJobLog(params?: JobLogListParams) {
  return downLoadXlsx(`/monitor/jobLog/export`, { params }, `job_log_${new Date().getTime()}.xlsx`);
}

// 清空调度日志
export function cleanJobLog() {
  return request('/monitor/jobLog/clean', {
    method: 'DELETE',
  });
}
