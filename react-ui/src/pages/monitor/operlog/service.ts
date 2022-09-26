import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { OperlogType, OperlogListParams } from './data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询操作日志记录列表
export async function getOperlogList(params?: OperlogListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/monitor/operlog/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询操作日志记录详细
export function getOperlog(operId: number) {
  return request(`/monitor/operlog/${operId}`, {
    method: 'GET',
  });
}

// 新增操作日志记录
export async function addOperlog(params: OperlogType) {
  return request('/monitor/operlog', {
    method: 'POST',
    data: params,
  });
}

// 修改操作日志记录
export async function updateOperlog(params: OperlogType) {
  return request('/monitor/operlog', {
    method: 'PUT',
    data: params,
  });
}

// 删除操作日志记录
export async function removeOperlog(ids: string) {
  return request(`/monitor/operlog/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出操作日志记录
export function exportOperlog(params?: OperlogListParams) {
  return downLoadXlsx(`/monitor/operlog/export`, { params }, `oper_log_${new Date().getTime()}.xlsx`);
}

// 清空操作日志
export async function cleanOperlog() {
  return request('/monitor/operlog/clean', {
    method: 'DELETE',
  });
}
