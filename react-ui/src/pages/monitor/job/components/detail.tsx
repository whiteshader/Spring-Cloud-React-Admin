import React, { useEffect } from 'react';
import { Modal, Descriptions, Button } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { JobType } from '../data';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */

export type OperlogFormValueType = Record<string, unknown> & Partial<JobType>;

export type OperlogFormProps = {
  onCancel: (flag?: boolean, formVals?: OperlogFormValueType) => void;
  visible: boolean;
  values: Partial<JobType>;
  statusOptions: any;
};

const OperlogForm: React.FC<OperlogFormProps> = (props) => {
  const { values, statusOptions } = props;

  useEffect(() => {}, [props]);

  const intl = useIntl();

  const misfirePolicy = {
    0: '默认策略',
    1: '立即执行',
    2: '执行一次',
    3: '放弃执行',
  };

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
          label={<FormattedMessage id="monitor.Job.job_id" defaultMessage="任务编号" />}
        >
          {values.jobId}
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
          {values.jobGroup}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.concurrent" defaultMessage="是否并发执行" />}
        >
          {values.concurrent === '1' ? '禁止' : '允许'}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={
            <FormattedMessage id="monitor.Job.misfire_policy" defaultMessage="计划执行错误策略" />
          }
        >
          {misfirePolicy[values.misfirePolicy ? values.misfirePolicy : '0']}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.create_time" defaultMessage="创建时间" />}
        >
          {values.createTime}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={<FormattedMessage id="monitor.Job.status" defaultMessage="状态" />}
        >
          {statusOptions[values.status ? values.status : 0]}
        </Descriptions.Item>
        <Descriptions.Item
          span={12}
          label={
            <FormattedMessage id="monitor.Job.next_valid_time" defaultMessage="下次执行时间" />
          }
        >
          {values.nextValidTime}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={
            <FormattedMessage id="monitor.Job.cron_expression" defaultMessage="cron执行表达式" />
          }
        >
          {values.cronExpression}
        </Descriptions.Item>
        <Descriptions.Item
          span={24}
          label={
            <FormattedMessage id="monitor.Job.invoke_target" defaultMessage="调用目标字符串" />
          }
        >
          {values.invokeTarget}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default OperlogForm;
