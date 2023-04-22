import { request } from '@umijs/max'; 

/**
 * 定时任务调度日志 API
 * 
 * @author whiteshader
 * @date 2023-02-07
 */

// 查询定时任务调度日志列表
export async function getJobLogList(params?: API.Monitor.JobLogListParams) {
  return request<API.Monitor.JobLogPageResult>('/api/monitor/jobLog/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// 查询定时任务调度日志详细
export function getJobLog(jobLogId: number) {
  return request<API.Monitor.JobLogInfoResult>(`/api/monitor/jobLog/${jobLogId}`, {
    method: 'GET'
  });
}

// 新增定时任务调度日志
export async function addJobLog(params: API.Monitor.JobLog) {
  return request<API.Result>('/api/monitor/jobLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// 修改定时任务调度日志
export async function updateJobLog(params: API.Monitor.JobLog) {
  return request<API.Result>('/api/monitor/jobLog', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// 删除定时任务调度日志
export async function removeJobLog(ids: string) {
  return request<API.Result>(`/api/monitor/jobLog/${ids}`, {
    method: 'DELETE'
  });
}

// 导出定时任务调度日志
export function exportJobLog(params?: API.Monitor.JobLogListParams) { 
  return request<API.Result>(`/api/monitor/jobLog/export`, {
    method: 'GET',
    params
  });
}
