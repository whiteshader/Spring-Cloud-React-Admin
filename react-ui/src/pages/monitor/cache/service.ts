import request from '@/utils/request';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


// 获取服务器信息
export async function getCacheInfo() {
  return request('/monitor/cache', {
    method: 'GET',
  });
}
