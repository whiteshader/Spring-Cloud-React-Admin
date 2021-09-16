import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTimePicker } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { LogininforType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type LogininforFormValueType = Record<string, unknown> & Partial<LogininforType>;

export type LogininforFormProps = {
  onCancel: (flag?: boolean, formVals?: LogininforFormValueType) => void;
  onSubmit: (values: LogininforFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<LogininforType>;
  statusOptions: any;
};

const LogininforForm: React.FC<LogininforFormProps> = (props) => {
  const [form] = Form.useForm();

  const { statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      infoId: props.values.infoId,
      userName: props.values.userName,
      ipaddr: props.values.ipaddr,
      loginLocation: props.values.loginLocation,
      browser: props.values.browser,
      os: props.values.os,
      status: props.values.status,
      msg: props.values.msg,
      loginTime: props.values.loginTime,
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
    props.onSubmit(values as LogininforFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: '编辑系统访问记录',
        defaultMessage: '编辑系统访问记录',
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
              name="infoId"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.info_id',
                defaultMessage: '访问ID',
              })}
              width="xl"
              placeholder="请输入访问ID"
              disabled
              hidden={!props.values.infoId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入访问ID！" defaultMessage="请输入访问ID！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="userName"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.user_name',
                defaultMessage: '用户账号',
              })}
              width="xl"
              placeholder="请输入用户账号"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入用户账号！" defaultMessage="请输入用户账号！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="ipaddr"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.ipaddr',
                defaultMessage: '登录IP地址',
              })}
              width="xl"
              placeholder="请输入登录IP地址"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入登录IP地址！" defaultMessage="请输入登录IP地址！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="loginLocation"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.login_location',
                defaultMessage: '登录地点',
              })}
              width="xl"
              placeholder="请输入登录地点"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入登录地点！" defaultMessage="请输入登录地点！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="browser"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.browser',
                defaultMessage: '浏览器类型',
              })}
              width="xl"
              placeholder="请输入浏览器类型"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入浏览器类型！" defaultMessage="请输入浏览器类型！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="os"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.os',
                defaultMessage: '操作系统',
              })}
              width="xl"
              placeholder="请输入操作系统"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入操作系统！" defaultMessage="请输入操作系统！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.status',
                defaultMessage: '登录状态',
              })}
              width="xl"
              placeholder="请输入登录状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入登录状态！" defaultMessage="请输入登录状态！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="msg"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.msg',
                defaultMessage: '提示消息',
              })}
              width="xl"
              placeholder="请输入提示消息"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入提示消息！" defaultMessage="请输入提示消息！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTimePicker
              name="loginTime"
              label={intl.formatMessage({
                id: 'monitor.Logininfor.login_time',
                defaultMessage: '访问时间',
              })}
              width="xl"
              placeholder="请输入访问时间"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入访问时间！" defaultMessage="请输入访问时间！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default LogininforForm;
