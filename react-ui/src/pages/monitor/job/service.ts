import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { JobType, JobListParams } from './data.d';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

// 查询定时任务调度列表
export async function getJobList(params?: JobListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/monitor/job/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询定时任务调度详细
export function getJob(jobId: number) {
  return request(`/monitor/job/${jobId}`, {
    method: 'GET',
  });
}

// 新增定时任务调度
export async function addJob(params: JobType) {
  return request('/monitor/job', {
    method: 'POST',
    data: params,
  });
}

// 修改定时任务调度
export async function updateJob(params: JobType) {
  return request('/monitor/job', {
    method: 'PUT',
    data: params,
  });
}

// 删除定时任务调度
export async function removeJob(ids: string) {
  return request(`/monitor/job/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出定时任务调度
export function exportJob(params?: JobListParams) {
  return downLoadXlsx(`/monitor/job/export`, { params }, `job_${new Date().getTime()}.xlsx`);
}

// 定时任务立即执行一次
export async function runJob(jobId: number, jobGroup: string) {
  const job = {
    jobId,
    jobGroup,
  };
  return request('/monitor/job/run', {
    method: 'PUT',
    data: job,
  });
}
