/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type PostType = {
  postId: number;
  postCode: string;
  postName: string;
  postSort: number;
  status: string;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
};

export type PostListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type PostListData = {
  list: PostType[];
  pagination: Partial<PostListPagination>;
};

export type PostListParams = {
  postId?: string;
  postCode?: string;
  postName?: string;
  postSort?: string;
  status?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
