import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { NoticeType, NoticeListParams } from './data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

// 查询通知公告列表
export async function getNoticeList(params?: NoticeListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/notice/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询通知公告详细
export function getNotice(noticeId: number) {
  return request(`/system/notice/${noticeId}`, {
    method: 'GET',
  });
}

// 新增通知公告
export async function addNotice(params: NoticeType) {
  return request('/system/notice', {
    method: 'POST',
    data: params,
  });
}

// 修改通知公告
export async function updateNotice(params: NoticeType) {
  return request('/system/notice', {
    method: 'PUT',
    data: params,
  });
}

// 删除通知公告
export async function removeNotice(ids: string) {
  return request(`/system/notice/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出通知公告
export function exportNotice(params?: NoticeListParams) {
  return downLoadXlsx(`/system/notice/export`, { params }, `notice_${new Date().getTime()}.xlsx`);
}
