import type { DataNode } from 'antd/lib/tree';
import { parse } from 'querystring';

export const LoginPageUrl = '/user/login';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export function trim(x: string) {
  return x.replace(/^\s+|\s+$/gm,'');  
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function buildTreeData(
  data: any[],
  id: string,
  name: string,
  parentId: string,
  parentName: string,
  children: string,
) {
  const config = {
    id: id || 'id',
    name: name || 'name',
    parentId: parentId || 'parentId',
    parentName: parentName || 'parentName',
    childrenList: children || 'children',
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree: any[] = [];
  data.forEach((item: { id: string; name: string; key: string; title: string; value: any }) => {
    const d = item;
    const pId = d[config.parentId];
    if (childrenListMap[pId] == null) {
      childrenListMap[pId] = [];
    }
    d.key = d[config.id];
    d.title = d[config.name];
    d.value = d[config.id];
    nodeIds[d[config.id]] = d;
    childrenListMap[pId].push(d);
  });

  data.forEach((item: any) => {
    const d = item;
    const pId = d[config.parentId];
    if (nodeIds[pId] == null) {
      d[config.parentName] = '';
      tree.push(d);
    }
  });

  tree.forEach((t: any) => {
    adaptToChildrenList(t);
  });

  function adaptToChildrenList(item: any) {
    const o = item;
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      o[config.childrenList].forEach((child: any) => {
        const c = child;
        c[config.parentName] = o[config.name];
        adaptToChildrenList(c);
      });
    }
  }
  return tree;
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function formatTreeSelectData(arrayList: any): DataNode[] {
  const treeSelectData: DataNode[] = arrayList.map((item: any) => {
    const node: DataNode = {
      id: item.id,
      title: item.label,
      key: item.id,
      value: item.id
    } as DataNode;
    if (item.children) {
      node.children = formatTreeSelectData(item.children);
    }
    return node;
  });
  return treeSelectData;
}

export function download(fileName: string) {
	window.location.href = `/common/download?fileName=${encodeURI(fileName)}&delete=${  true}`;
}