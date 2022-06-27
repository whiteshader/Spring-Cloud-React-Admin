
/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/06/27
 * 
 * */

 

export type CacheDataType = {
  cacheKey: string;
  cacheName: string;
  cacheValue: string;
  remark: string;
};

export type CacheNamesResponseType = {
  data: CacheDataType[];
  code: number;
  msg: string;
};
