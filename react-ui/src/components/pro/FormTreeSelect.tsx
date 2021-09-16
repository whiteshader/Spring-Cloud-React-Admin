import React from 'react';
import type { TreeSelectProps } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface'
import type { ExtendsProps } from '@ant-design/pro-form/lib/BaseForm/createField';
import createField from '@ant-design/pro-form/lib/BaseForm/createField';

export type ProFormTreeSelectProps<T = any> = ProFormItemProps<
TreeSelectProps<T> & {
    /**
     * 是否在输入框聚焦时触发搜索
     *
     * @default false
     */
    searchOnFocus?: boolean;
    /**
     * 选择完一个之后是否清空搜索项重新搜索
     *
     * @default false
     */
    resetAfterSelect?: boolean;
    /** 自定义选项渲染 */
    optionItemRender?: (item: T) => React.ReactNode;
  }
> & {
  valueEnum?: ProSchema['valueEnum'];
  params?: ProSchema['params'];
  request?: ProSchema['request'];
  options?: TreeSelectProps<any>['options'] | string[];
  multiple?: TreeSelectProps<any>['multiple'] | false;
  showSearch?: TreeSelectProps<any>['showSearch'];
  readonly?: boolean;
};

/**
 * 选择框
 *
 * @param
 */
const ProFormTreeSelectComponents = React.forwardRef<any, ProFormTreeSelectProps<any>>(
  (
    { fieldProps, children, params, proFieldProps, multiple, valueEnum, request, showSearch, options },
    ref,
  ) => {
    return (
      <ProField
        mode="edit"
        valueEnum={runFunction(valueEnum)}
        request={request}
        params={params}
        valueType="select"
        fieldProps={{
          options,
          multiple,
          showSearch,
          ...fieldProps,
        }}
        ref={ref}
        {...proFieldProps}
      >
        {children}
      </ProField>
    );
  },
);

const SearchTreeSelect = React.forwardRef<any, ProFormTreeSelectProps<any>>(
  ({ fieldProps, children, params, proFieldProps, multiple, valueEnum, request, options }, ref) => {
    const props: Omit<TreeSelectProps<any>, 'options'> & {
      options?: ProFormTreeSelectProps['options'];
    } = {
      options,
      multiple: false,
      labelInValue: true,
      showSearch: true,
      showArrow: false,
      autoClearSearchValue: true,
      ...fieldProps,
    };
    return (
      <ProField
        mode="edit"
        valueEnum={runFunction(valueEnum)}
        request={request}
        params={params}
        valueType="select"
        fieldProps={props}
        ref={ref}
        {...proFieldProps}
      >
        {children}
      </ProField>
    );
  },
);

const ProFormSelect = createField<ProFormTreeSelectProps>(ProFormTreeSelectComponents, {
  customLightMode: true,
}) as <T>(props: ProFormTreeSelectProps<T> & ExtendsProps) => React.ReactElement;

const ProFormSearchTreeSelect = createField<ProFormTreeSelectProps>(SearchTreeSelect, {
  customLightMode: true,
}) as <T>(props: ProFormTreeSelectProps<T> & ExtendsProps) => React.ReactElement;

const WrappedProFormTreeSelect = ProFormSelect as (<T = any>(
  props: ProFormTreeSelectProps<T>,
) => React.ReactElement) & {
  SearchTreeSelect: typeof ProFormSearchTreeSelect;
};

WrappedProFormTreeSelect.SearchTreeSelect = ProFormSearchTreeSelect;

export default WrappedProFormTreeSelect;