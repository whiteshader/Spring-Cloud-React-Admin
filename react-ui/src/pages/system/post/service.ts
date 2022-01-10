import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type { PostType, PostListParams } from './data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */



// 查询岗位信息列表
export async function getPostList (params?: PostListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/api/system/post/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 查询岗位信息详细
export function getPost (postId: number) {
  return request(`/api/system/post/${postId}`, {
    method: 'GET'
  });
}

// 新增岗位信息
export async function addPost (params: PostType) {
  return request('/api/system/post', {
    method: 'POST',
    data: params
  });
}

// 修改岗位信息
export async function updatePost (params: PostType) {
  return request('/api/system/post', {
    method: 'PUT',
    data: params
  });
}

// 删除岗位信息
export async function removePost (ids: string) {
  return request(`/api/system/post/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 导出岗位信息
export function exportPost (params?: PostListParams) {  
  return downLoadXlsx(`/api/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
}
