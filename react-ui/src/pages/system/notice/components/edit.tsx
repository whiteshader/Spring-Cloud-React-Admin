import React, { useEffect } from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormRadio,
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { NoticeType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


export type NoticeFormValueType = Record<string, unknown> & Partial<NoticeType>;

export type NoticeFormProps = {
  onCancel: (flag?: boolean, formVals?: NoticeFormValueType) => void;
  onSubmit: (values: NoticeFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<NoticeType>;
  noticeTypeOptions: any;
  statusOptions: any;
};

const NoticeForm: React.FC<NoticeFormProps> = (props) => {
  const [form] = Form.useForm();

  const { noticeTypeOptions, statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      noticeId: props.values.noticeId,
      noticeTitle: props.values.noticeTitle,
      noticeType: props.values.noticeType,
      noticeContent: props.values.noticeContent,
      status: props.values.status,
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
    props.onSubmit(values as NoticeFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.Notice.modify',
        defaultMessage: '编辑通知公告',
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
              name="noticeId"
              label={intl.formatMessage({
                id: 'system.Notice.notice_id',
                defaultMessage: '公告ID',
              })}
              width="xl"
              placeholder="请输入公告ID"
              disabled
              hidden={!props.values.noticeId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入公告ID！" defaultMessage="请输入公告ID！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="noticeTitle"
              label={intl.formatMessage({
                id: 'system.Notice.notice_title',
                defaultMessage: '公告标题',
              })}
              width="xl"
              placeholder="请输入公告标题"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入公告标题！" defaultMessage="请输入公告标题！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormSelect
              valueEnum={noticeTypeOptions}
              name="noticeType"
              label={intl.formatMessage({
                id: 'system.Notice.notice_type',
                defaultMessage: '公告类型',
              })}
              width="xl"
              placeholder="请输入公告类型"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入公告类型！" defaultMessage="请输入公告类型！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="noticeContent"
              label={intl.formatMessage({
                id: 'system.Notice.notice_content',
                defaultMessage: '公告内容',
              })}
              width="xl"
              placeholder="请输入公告内容"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入公告内容！" defaultMessage="请输入公告内容！" />
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
                id: 'system.Notice.status',
                defaultMessage: '公告状态',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="请输入公告状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入公告状态！" defaultMessage="请输入公告状态！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="remark"
              label={intl.formatMessage({
                id: 'system.Notice.remark',
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

export default NoticeForm;
