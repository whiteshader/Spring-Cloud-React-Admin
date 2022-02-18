import React, { useEffect } from 'react';
import {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Form, Modal } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { DictDataType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


export type DictDataFormValueType = Record<string, unknown> & Partial<DictDataType>;

export type DictDataFormProps = {
  onCancel: (flag?: boolean, formVals?: DictDataFormValueType) => void;
  onSubmit: (values: DictDataFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<DictDataType>;
  statusOptions: any;
  dictType: string;
};

const DictDataForm: React.FC<DictDataFormProps> = (props) => {
  const [form] = Form.useForm();

  const { statusOptions, dictType } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      dictCode: props.values.dictCode,
      dictSort: props.values.dictSort,
      dictLabel: props.values.dictLabel,
      dictValue: props.values.dictValue,
      dictType,
      cssClass: props.values.cssClass,
      listClass: props.values.listClass,
      isDefault: props.values.isDefault,
      status: props.values.status,
      remark: props.values.remark,
    });
  }, [dictType, form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = (values: Record<string, any>) => {
    props.onSubmit(values as DictDataFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.DictData.modify',
        defaultMessage: '编辑DictData',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <ProFormText
          name="dictCode"
          label={intl.formatMessage({
            id: 'system.DictData.dict_code',
            defaultMessage: '字典编码',
          })}
          width="xl"
          placeholder="请输入字典编码"
          disabled
          hidden={true}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入字典编码！" defaultMessage="请输入字典编码！" />,
            },
          ]}
        />
        <ProFormText
          name="dictType"
          label={intl.formatMessage({
            id: 'system.DictData.dict_type',
            defaultMessage: '字典类型',
          })}
          width="xl"
          placeholder="请输入字典类型"
          disabled
          hidden={!dictType}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入字典类型！" defaultMessage="请输入字典类型！" />,
            },
          ]}
        />
        <ProFormText
          name="dictLabel"
          label={intl.formatMessage({
            id: 'system.DictData.dict_label',
            defaultMessage: '字典标签',
          })}
          width="xl"
          placeholder="请输入字典标签"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入字典标签！" defaultMessage="请输入字典标签！" />,
            },
          ]}
        />
        <ProFormText
          name="dictValue"
          label={intl.formatMessage({
            id: 'system.DictData.dict_value',
            defaultMessage: '字典键值',
          })}
          width="xl"
          placeholder="请输入字典键值"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入字典键值！" defaultMessage="请输入字典键值！" />,
            },
          ]}
        />
        <ProFormDigit
          name="dictSort"
          label={intl.formatMessage({
            id: 'system.DictData.dict_sort',
            defaultMessage: '字典排序',
          })}
          width="xl"
          placeholder="请输入字典排序"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入字典排序！" defaultMessage="请输入字典排序！" />,
            },
          ]}
        />
        <ProFormText
          name="cssClass"
          label={intl.formatMessage({
            id: 'system.DictData.css_class',
            defaultMessage: '样式属性',
          })}
          width="xl"
          placeholder="请输入样式属性"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入样式属性！" defaultMessage="请输入样式属性！" />,
            },
          ]}
        />
        <ProFormSelect
          name="listClass"
          label={intl.formatMessage({
            id: 'system.DictData.list_class',
            defaultMessage: '表格回显样式',
          })}
          width="xl"
          placeholder="请输入表格回显样式"
          rules={[
            {
              required: false,
              message: (
                <FormattedMessage id="请输入表格回显样式！" defaultMessage="请输入表格回显样式！" />
              ),
            },
          ]}
          options={[
            {
              value: 'default',
              label: '默认',
            },
            {
              value: 'primary',
              label: '主要',
            },
            {
              value: 'success',
              label: '成功',
            },
            {
              value: 'info',
              label: '信息',
            },
            {
              value: 'warning',
              label: '警告',
            },
            {
              value: 'danger',
              label: '危险',
            },
          ]}
        />
        <ProFormRadio.Group
          valueEnum={statusOptions}
          name="status"
          label={intl.formatMessage({
            id: 'system.DictType.status',
            defaultMessage: '状态',
          })}
          width="xl"
          labelCol={{ span: 24 }}
          placeholder="请输入状态"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入状态！" defaultMessage="请输入状态！" />,
            },
          ]}
        />
        <ProFormTextArea
          name="remark"
          label={intl.formatMessage({
            id: 'system.DictData.remark',
            defaultMessage: '备注',
          })}
          width="xl"
          placeholder="请输入备注"
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入备注！" defaultMessage="请输入备注！" />,
            },
          ]}
        />
      </Form>
    </Modal>
  );
};

export default DictDataForm;
