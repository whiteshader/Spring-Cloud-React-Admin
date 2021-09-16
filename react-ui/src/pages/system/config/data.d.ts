/**
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * */

export type ConfigType = {
  configId: number;
  configName: string;
  configKey: string;
  configValue: string;
  configType: string;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
};

export type ConfigListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ConfigListData = {
  list: ConfigType[];
  pagination: Partial<ConfigListPagination>;
};

export type ConfigListParams = {
  configId?: string;
  configName?: string;
  configKey?: string;
  configValue?: string;
  configType?: string;
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
