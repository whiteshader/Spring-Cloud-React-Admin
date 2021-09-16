/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type MenuType = {
  menuId: number;
  menuName: string;
  parentId: string;
  orderNum: number;
  path: string;
  component: string;
  isFrame: number;
  isCache: number;
  menuType: string;
  visible: string;
  status: string;
  perms: string;
  icon: string;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
};

export type MenuListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type MenuListData = {
  list: MenuType[];
  pagination: Partial<MenuListPagination>;
};

export type MenuListParams = {
  menuId?: string;
  menuName?: string;
  parentId?: string;
  orderNum?: string;
  path?: string;
  component?: string;
  isFrame?: string;
  isCache?: string;
  menuType?: string;
  visible?: string;
  status?: string;
  perms?: string;
  icon?: string;
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
