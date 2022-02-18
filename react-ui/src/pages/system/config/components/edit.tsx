import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormTextArea, ProFormRadio } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ConfigType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type ConfigFormValueType = Record<string, unknown> & Partial<ConfigType>;

export type ConfigFormProps = {
  onCancel: (flag?: boolean, formVals?: ConfigFormValueType) => void;
  onSubmit: (values: ConfigFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<ConfigType>;
  configTypeOptions: any;
};

const ConfigForm: React.FC<ConfigFormProps> = (props) => {
  const [form] = Form.useForm();

  const { configTypeOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      configId: props.values.configId,
      configName: props.values.configName,
      configKey: props.values.configKey,
      configValue: props.values.configValue,
      configType: props.values.configType,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
    });
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = (values: Record<string, any>) => {
    props.onSubmit(values as ConfigFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.Config.modify',
        defaultMessage: '编辑参数配置',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="configId"
              label={intl.formatMessage({
                id: 'system.Config.config_id',
                defaultMessage: '参数主键',
              })}
              width="xl"
              placeholder="请输入参数主键"
              disabled
              hidden={!props.values.configId}
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入参数主键！" defaultMessage="请输入参数主键！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="configName"
              label={intl.formatMessage({
                id: 'system.Config.config_name',
                defaultMessage: '参数名称',
              })}
              width="xl"
              placeholder="请输入参数名称"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入参数名称！" defaultMessage="请输入参数名称！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="configKey"
              label={intl.formatMessage({
                id: 'system.Config.config_key',
                defaultMessage: '参数键名',
              })}
              width="xl"
              placeholder="请输入参数键名"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入参数键名！" defaultMessage="请输入参数键名！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="configValue"
              label={intl.formatMessage({
                id: 'system.Config.config_value',
                defaultMessage: '参数键值',
              })}
              width="xl"
              placeholder="请输入参数键值"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入参数键值！" defaultMessage="请输入参数键值！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={configTypeOptions}
              name="configType"
              label={intl.formatMessage({
                id: 'system.Config.config_type',
                defaultMessage: '系统内置',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="请输入系统内置"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入系统内置！" defaultMessage="请输入系统内置！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="remark"
              label={intl.formatMessage({
                id: 'system.Config.remark',
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ConfigForm;
