import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { ConfigType, ConfigListParams } from './data.d';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询参数配置列表
export async function getConfigList(params?: ConfigListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/config/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询参数配置详细
export function getConfig(configId: number) {
  return request(`/system/config/${configId}`, {
    method: 'GET',
  });
}

// 新增参数配置
export async function addConfig(params: ConfigType) {
  return request('/system/config', {
    method: 'POST',
    data: params,
  });
}

// 修改参数配置
export async function updateConfig(params: ConfigType) {
  return request('/system/config', {
    method: 'PUT',
    data: params,
  });
}

// 删除参数配置
export async function removeConfig(ids: string) {
  return request(`/system/config/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出参数配置
export function exportConfig(params?: ConfigListParams) {
  return downLoadXlsx(`/system/config/export`, { params }, `config_${new Date().getTime()}.xlsx`);
}
