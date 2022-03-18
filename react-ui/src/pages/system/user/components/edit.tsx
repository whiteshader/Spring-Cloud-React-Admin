import React, { useEffect, useState } from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { UserType } from '../data.d';
import type { DataNode } from 'antd/lib/tree';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


export type UserFormValueType = Record<string, unknown> & Partial<UserType>;

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormValueType) => void;
  onSubmit: (values: UserFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<UserType>;
  sexOptions: any;
  statusOptions: any;
  postIds: string[];
  posts: string[];
  roleIds: string[];
  roles: string[];
  depts: DataNode[];
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');

  const { sexOptions, statusOptions } = props;
  const { roles, posts, depts } = props;

  useEffect(() => {
    form.resetFields();
    setUserId(props.values.userId);
    form.setFieldsValue({
      userId: props.values.userId,
      deptId: props.values.deptId,
      postIds: props.postIds,
      roleIds: props.roleIds,
      userName: props.values.userName,
      nickName: props.values.nickName,
      userType: props.values.userType,
      email: props.values.email,
      phonenumber: props.values.phonenumber,
      sex: props.values.sex,
      avatar: props.values.avatar,
      password: props.values.password,
      status: props.values.status,
      delFlag: props.values.delFlag,
      loginIp: props.values.loginIp,
      loginDate: props.values.loginDate,
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
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as UserFormValueType);
    return true;
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.User.modify_info',
        defaultMessage: '编辑用户信息',
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
              name="userId"
              label={intl.formatMessage({
                id: 'system.User.user_id',
                defaultMessage: '用户ID',
              })}
              width="xl"
              placeholder="请输入用户ID"
              disabled
              hidden={!props.values.userId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入用户ID！" defaultMessage="请输入用户ID！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="nickName"
              label={intl.formatMessage({
                id: 'system.User.nick_name',
                defaultMessage: '用户昵称',
              })}
              width="xl"
              placeholder="请输入用户昵称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入用户昵称！" defaultMessage="请输入用户昵称！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormTreeSelect
              name="deptId"
              label={intl.formatMessage({
                id: 'system.User.dept_id',
                defaultMessage: '部门',
              })}
              request={async () => {
                return depts;
              }}
              width="xl"
              placeholder="请输入用户昵称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入用户昵称！" defaultMessage="请输入用户昵称！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="phonenumber"
              label={intl.formatMessage({
                id: 'system.User.phonenumber',
                defaultMessage: '手机号码',
              })}
              width="xl"
              placeholder="请输入手机号码"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入手机号码！" defaultMessage="请输入手机号码！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="email"
              label={intl.formatMessage({
                id: 'system.User.email',
                defaultMessage: '用户邮箱',
              })}
              width="xl"
              placeholder="请输入用户邮箱"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入用户邮箱！" defaultMessage="请输入用户邮箱！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="userName"
              label={intl.formatMessage({
                id: 'system.User.user_name',
                defaultMessage: '用户账号',
              })}
              width="xl"
              hidden={userId}
              placeholder="请输入用户账号"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入用户账号！" defaultMessage="请输入用户账号！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="password"
              label={intl.formatMessage({
                id: 'system.User.password',
                defaultMessage: '密码',
              })}
              width="xl"
              hidden={userId}
              placeholder="请输入密码"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入密码！" defaultMessage="请输入密码！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormSelect
              valueEnum={sexOptions}
              name="sex"
              label={intl.formatMessage({
                id: 'system.User.sex',
                defaultMessage: '用户性别',
              })}
              width="xl"
              placeholder="请输入用户性别"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入用户性别！" defaultMessage="请输入用户性别！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.User.status',
                defaultMessage: '帐号状态',
              })}
              width="xl"
              placeholder="请输入帐号状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入帐号状态！" defaultMessage="请输入帐号状态！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="avatar"
              label={intl.formatMessage({
                id: 'system.User.avatar',
                defaultMessage: '头像地址',
              })}
              width="xl"
              placeholder="请输入头像地址"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入头像地址！" defaultMessage="请输入头像地址！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormSelect
              name="postIds"
              mode="multiple"
              width="xl"
              label={intl.formatMessage({
                id: 'post',
                defaultMessage: '岗位',
              })}
              options={posts}
              placeholder="请选择岗位"
              rules={[{ required: true, message: '请选择岗位!' }]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              name="roleIds"
              mode="multiple"
              width="xl"
              label={intl.formatMessage({
                id: 'role',
                defaultMessage: '角色',
              })}
              options={roles}
              placeholder="请选择角色"
              rules={[{ required: true, message: '请选择角色!' }]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="remark"
              label={intl.formatMessage({
                id: 'system.User.remark',
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

export default UserForm;
