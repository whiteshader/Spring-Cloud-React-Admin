import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import { formatTreeSelectData } from '@/utils/utils';
import type { DataNode } from 'antd/lib/tree';
import type { DeptType, DeptListParams } from './data.d';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 查询部门列表
export async function getDeptList(params?: DeptListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/dept/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询部门列表（排除节点）
export function getDeptListExcludeChild(deptId: number) {
  return request(`/system/dept/list/exclude/${deptId}`, {
    method: 'get',
  });
}

// 查询部门详细
export function getDept(deptId: number) {
  return request(`/system/dept/${deptId}`, {
    method: 'GET',
  });
}

// 新增部门
export async function addDept(params: DeptType) {
  return request('/system/dept', {
    method: 'POST',
    data: params,
  });
}

// 修改部门
export async function updateDept(params: DeptType) {
  return request('/system/dept', {
    method: 'PUT',
    data: params,
  });
}

// 删除部门
export async function removeDept(ids: string) {
  return request(`/system/dept/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出部门
export function exportDept(params?: DeptListParams) {
  return downLoadXlsx(`/system/dept/export`, { params }, `dept_${new Date().getTime()}.xlsx`);
}

// 获取数据列表
export function getTreeList(params: any): Promise<DataNode[]> {
  return new Promise((resolve) => {
    const queryString = new URLSearchParams(params).toString();
    request(`/system/dept/treeselect?${queryString}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then((res) => {
      if(res && res.code === 200) {
        const treeData = formatTreeSelectData(res.data);
        resolve(treeData);
      } else {
        resolve([]);
      }
    });
  });
}
