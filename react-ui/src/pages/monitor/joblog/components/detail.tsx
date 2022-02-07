import React, { useEffect } from 'react';
import { Form, Modal, Descriptions } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { JobLogType } from '../data';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type JobLogFormValueType = Record<string, unknown> & Partial<JobLogType>;

export type JobLogFormProps = {
  onCancel: (flag?: boolean, formVals?: JobLogFormValueType) => void;
  visible: boolean;
  values: Partial<JobLogType>;
  statusOptions: any;
  jobGroupOptions: any;
};

const JobLogForm: React.FC<JobLogFormProps> = (props) => {
  const [form] = Form.useForm();

  const { values, statusOptions, jobGroupOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      jobLogId: props.values.jobLogId,
      jobName: props.values.jobName,
      jobGroup: props.values.jobGroup,
      invokeTarget: props.values.invokeTarget,
      jobMessage: props.values.jobMessage,
      status: props.values.status,
      exceptionInfo: props.values.exceptionInfo,
      createTime: props.values.createTime,
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

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'monitor.JobLog.title',
        defaultMessage: '定时任务调度日志',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Descriptions column={24}>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.job_id" defaultMessage="任务编号" />}
        >
          {values.jobLogId}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.create_time" defaultMessage="执行时间" />}
        >
          {values.createTime}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.job_name" defaultMessage="任务名称" />}
        >
          {values.jobName}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.job_group" defaultMessage="任务组名" />}
        >
          {jobGroupOptions[values.jobGroup ? values.jobGroup : 'DEFAULT']}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Job.invoke_target" defaultMessage="调用目标" />}
        >
          {values.invokeTarget}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Job.job_message" defaultMessage="日志信息" />}
        >
          {values.jobMessage}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={<FormattedMessage id="monitor.Job.exception_info" defaultMessage="异常信息" />}
        >
          {values.exceptionInfo}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.status" defaultMessage="执行状态" />}
        >
          {statusOptions[values.status ? values.status : 0]}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default JobLogForm;
