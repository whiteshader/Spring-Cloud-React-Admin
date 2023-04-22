import { request } from '@umijs/max';
import { downLoadZip } from '@/utils/downloadfile';
import type { GenCodeType, GenCodeTableListParams } from './data.d';

// 查询分页列表
export async function getGenCodeList(params?: GenCodeTableListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/api/tool/gen/list?${queryString}`, {
    data: params,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询表信息
export async function getGenCode(id?: string) {
  return request(`/api/tool/gen/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询数据表信息
export async function queryTableList(params?: any) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/api/tool/gen/db/list?${queryString}`, {
    data: params,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导入数据表信息
export async function importTables(tables?: string) {
  return request(`/api/tool/gen/importTable?tables=${tables}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 删除
export async function removeData(params: { ids: string[] }) {
  return request(`/api/tool/gen/${params.ids}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 添加数据
export async function addData(params: GenCodeType) {
  return request('/api/tool/gen', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新数据
export async function updateData(params: GenCodeType) {
  return request('/api/tool/gen', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

// 更新状态
export async function syncDbInfo(tableName: string) {
  return request(`/api/tool/gen/synchDb/${tableName}`, {
    method: 'GET',
  });
}

// 生成代码（自定义路径）
export async function genCode(tableName: string) {
  return request(`/api/tool/gen/genCode/${tableName}`, {
    method: 'GET',
  });
}

// 生成代码（压缩包）
export async function batchGenCode(tableName: string) {
  return downLoadZip(`/api/tool/gen/batchGenCode?tables=${tableName}`);
}

// 预览
export async function previewCode(id: string) {
  return request(`/api/tool/gen/preview/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
