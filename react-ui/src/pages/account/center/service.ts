import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/getInfo');
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}