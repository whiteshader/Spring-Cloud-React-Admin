import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormTextArea, ProFormRadio } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { JobType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


export type JobFormValueType = Record<string, unknown> & Partial<JobType>;

export type JobFormProps = {
  onCancel: (flag?: boolean, formVals?: JobFormValueType) => void;
  onSubmit: (values: JobFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<JobType>;
  statusOptions: any;
};

const JobForm: React.FC<JobFormProps> = (props) => {
  const [form] = Form.useForm();

  const { statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      jobId: props.values.jobId,
      jobName: props.values.jobName,
      jobGroup: props.values.jobGroup,
      invokeTarget: props.values.invokeTarget,
      cronExpression: props.values.cronExpression,
      misfirePolicy: props.values.misfirePolicy,
      concurrent: props.values.concurrent,
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
    props.onSubmit(values as JobFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'monitor.Job.modify',
        defaultMessage: '编辑定时任务调度',
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
              name="jobId"
              label={intl.formatMessage({
                id: 'monitor.Job.job_id',
                defaultMessage: '任务ID',
              })}
              width="xl"
              placeholder="请输入任务ID"
              disabled
              hidden={!props.values.jobId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入任务ID！" defaultMessage="请输入任务ID！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="jobName"
              label={intl.formatMessage({
                id: 'monitor.Job.job_name',
                defaultMessage: '任务名称',
              })}
              width="xl"
              placeholder="请输入任务名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入任务名称！" defaultMessage="请输入任务名称！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="jobGroup"
              label={intl.formatMessage({
                id: 'monitor.Job.job_group',
                defaultMessage: '任务组名',
              })}
              width="xl"
              placeholder="请输入任务组名"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入任务组名！" defaultMessage="请输入任务组名！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="invokeTarget"
              label={intl.formatMessage({
                id: 'monitor.Job.invoke_target',
                defaultMessage: '调用目标字符串',
              })}
              width="xl"
              placeholder="请输入调用目标字符串"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="请输入调用目标字符串！"
                      defaultMessage="请输入调用目标字符串！"
                    />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="cronExpression"
              label={intl.formatMessage({
                id: 'monitor.Job.cron_expression',
                defaultMessage: 'cron执行表达式',
              })}
              width="xl"
              placeholder="请输入cron执行表达式"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="请输入cron执行表达式！"
                      defaultMessage="请输入cron执行表达式！"
                    />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="misfirePolicy"
              label={intl.formatMessage({
                id: 'monitor.Job.misfire_policy',
                defaultMessage: '计划执行错误策略',
              })}
              width="xl"
              placeholder="请输入计划执行错误策略"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage
                      id="请输入计划执行错误策略！"
                      defaultMessage="请输入计划执行错误策略！"
                    />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="concurrent"
              label={intl.formatMessage({
                id: 'monitor.Job.concurrent',
                defaultMessage: '是否并发执行',
              })}
              width="xl"
              placeholder="请输入是否并发执行"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage
                      id="请输入是否并发执行！"
                      defaultMessage="请输入是否并发执行！"
                    />
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
                id: 'monitor.Job.status',
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default JobForm;
