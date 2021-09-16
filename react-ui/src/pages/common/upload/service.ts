import request from '@/utils/request';
import querystring from 'querystring'

export async function queryData(params?: any) {
  let queryString = querystring.stringify(params);
  return request('/system/organize/findListPage?'+queryString, {
    data: params,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

export async function removeData(params: { ids: string[] }) {
  return request('/system/organize/'+params.ids, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

export async function upload(formData:any) {
  return request('/system/upload/uploadFile', {
    method: 'POST',
    data: formData
  });
}

