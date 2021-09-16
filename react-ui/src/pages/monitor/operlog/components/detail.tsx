import React, { useEffect } from 'react';
import { Modal, Descriptions, Button } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { OperlogType } from '../data';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


export type OperlogFormValueType = Record<string, unknown> & Partial<OperlogType>;

export type OperlogFormProps = {
  onCancel: (flag?: boolean, formVals?: OperlogFormValueType) => void;
  onSubmit: (values: OperlogFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<OperlogType>;
  businessTypeOptions: any;
  operatorTypeOptions: any;
  statusOptions: any;
};

const OperlogForm: React.FC<OperlogFormProps> = (props) => {
  const { values, statusOptions, businessTypeOptions, operatorTypeOptions } = props;

  useEffect(() => {}, [props]);

  const intl = useIntl();

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <Modal
      width={800}
      title={intl.formatMessage({
        id: 'monitor.Operlog.detail',
        defaultMessage: '操作日志详细信息',
      })}
      visible={props.visible}
      destroyOnClose
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          关闭
        </Button>,
      ]}
    >
      <Descriptions column={24}>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.oper_id" defaultMessage="日志主键" />}
        >
          {values.operId}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.title" defaultMessage="所属模块" />}
        >
          {values.title}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.business_type" defaultMessage="业务类型" />}
        >
          {businessTypeOptions[values.businessType ? values.businessType : 0]}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.operator_type" defaultMessage="操作类别" />}
        >
          {operatorTypeOptions[values.operatorType ? values.operatorType : 0]}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Operlog.method" defaultMessage="方法名称" />}
        >
          {values.method}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Operlog.oper_url" defaultMessage="请求URL" />}
        >
          {values.operUrl}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.request_method" defaultMessage="请求方式" />}
        >
          {values.requestMethod}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.oper_name" defaultMessage="操作人员" />}
        >
          {values.operName}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.oper_ip" defaultMessage="主机地址" />}
        >
          {values.operIp}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.oper_location" defaultMessage="操作地点" />}
        >
          {values.operLocation}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Operlog.oper_param" defaultMessage="请求参数" />}
        >
          {values.operParam}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Operlog.json_result" defaultMessage="返回参数" />}
        >
          {values.jsonResult}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.status" defaultMessage="操作状态" />}
        >
          {statusOptions[values.status ? values.status : 0]}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Operlog.error_msg" defaultMessage="错误消息" />}
        >
          {values.errorMsg}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Operlog.oper_time" defaultMessage="操作时间" />}
        >
          {values.operTime}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default OperlogForm;
