import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { LogininforType, LogininforListParams } from './data.d';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询系统访问记录列表
export async function getLogininforList(params?: LogininforListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/monitor/logininfor/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询系统访问记录详细
export function getLogininfor(infoId: number) {
  return request(`/monitor/logininfor/${infoId}`, {
    method: 'GET',
  });
}

// 新增系统访问记录
export async function addLogininfor(params: LogininforType) {
  return request('/monitor/logininfor', {
    method: 'POST',
    data: params,
  });
}

// 修改系统访问记录
export async function updateLogininfor(params: LogininforType) {
  return request('/monitor/logininfor', {
    method: 'PUT',
    data: params,
  });
}

// 删除系统访问记录
export async function removeLogininfor(ids: string) {
  return request(`/monitor/logininfor/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出系统访问记录
export function exportLogininfor(params?: LogininforListParams) {
  return downLoadXlsx(`/monitor/logininfor/export`, { params }, `login_infor_${new Date().getTime()}.xlsx`);
}

// 清空登录日志
export async function cleanLogininfor() {
  return request('/monitor/logininfor/clean', {
    method: 'DELETE',
  });
}
