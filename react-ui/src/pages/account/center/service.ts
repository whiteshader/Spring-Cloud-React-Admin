import { request } from 'umi';
import type { CurrentUser, ListItemDataType } from './data.d';

export async function queryCurrentUserInfo(): Promise<{ data: CurrentUser }> {
  return { data: await request('/api/getInfo') }
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list_Detail', {
    params,
  });
}
