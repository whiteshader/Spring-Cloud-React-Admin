import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { PostType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


export type PostFormValueType = Record<string, unknown> & Partial<PostType>;

export type PostFormProps = {
  onCancel: (flag?: boolean, formVals?: PostFormValueType) => void;
  onSubmit: (values: PostFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<PostType>;
  statusOptions: any;
};

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();

  const { statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      postId: props.values.postId,
      postCode: props.values.postCode,
      postName: props.values.postName,
      postSort: props.values.postSort,
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
    props.onSubmit(values as PostFormValueType);
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.Post.modify',
        defaultMessage: '编辑岗位信息',
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
              name="postId"
              label={intl.formatMessage({
                id: 'system.Post.post_id',
                defaultMessage: '岗位ID',
              })}
              width="xl"
              placeholder="请输入岗位ID"
              disabled
              hidden={!props.values.postId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入岗位ID！" defaultMessage="请输入岗位ID！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="postCode"
              label={intl.formatMessage({
                id: 'system.Post.post_code',
                defaultMessage: '岗位编码',
              })}
              width="xl"
              placeholder="请输入岗位编码"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入岗位编码！" defaultMessage="请输入岗位编码！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="postName"
              label={intl.formatMessage({
                id: 'system.Post.post_name',
                defaultMessage: '岗位名称',
              })}
              width="xl"
              placeholder="请输入岗位名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入岗位名称！" defaultMessage="请输入岗位名称！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="postSort"
              label={intl.formatMessage({
                id: 'system.Post.post_sort',
                defaultMessage: '显示顺序',
              })}
              width="xl"
              placeholder="请输入显示顺序"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入显示顺序！" defaultMessage="请输入显示顺序！" />
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
                id: 'system.Post.status',
                defaultMessage: '状态',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="请输入状态"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入状态！" defaultMessage="请输入状态！" />,
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
                id: 'system.Post.remark',
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

export default PostForm;
