import React, { useEffect, useState } from 'react';
import {
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { Modal } from 'antd';
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
  open: boolean;
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
  const [form] = ProForm.useForm();

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
      open={props.open}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ProForm 
        form={form} 
        grid={true}
        layout="horizontal" 
        labelAlign="right"    
        onFinish={handleFinish} initialValues={props.values}>
        <ProFormDigit
          name="userId"
          label={intl.formatMessage({
            id: 'system.User.user_id',
            defaultMessage: '用户ID',
          })}
          placeholder="请输入用户ID"
          disabled
          hidden={true}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入用户ID！" defaultMessage="请输入用户ID！" />,
            },
          ]}
        />
        <ProFormText
          name="nickName"
          label={intl.formatMessage({
            id: 'system.User.nick_name',
            defaultMessage: '用户昵称',
          })}
          placeholder="请输入用户昵称"
          colProps={{ xs: 24, md: 12, xl: 12 }}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="请输入用户昵称！" defaultMessage="请输入用户昵称！" />
              ),
            },
          ]}
        />
        <ProFormTreeSelect
          name="deptId"
          label={intl.formatMessage({
            id: 'system.User.dept_id',
            defaultMessage: '部门',
          })}
          request={async () => {
            return depts;
          }}
          placeholder="请输入用户部门"
          colProps={{ md: 12, xl: 12}}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="请输入用户部门！" defaultMessage="请输入用户部门！" />
              ),
            },
          ]}
        />
        <ProFormText
          name="phonenumber"
          label={intl.formatMessage({
            id: 'system.User.phonenumber',
            defaultMessage: '手机号码',
          })}
          placeholder="请输入手机号码"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: (
                <FormattedMessage id="请输入手机号码！" defaultMessage="请输入手机号码！" />
              ),
            },
          ]}
        />
        <ProFormText
          name="email"
          label={intl.formatMessage({
            id: 'system.User.email',
            defaultMessage: '用户邮箱',
          })}
          width="xl"
          placeholder="请输入用户邮箱"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: (
                <FormattedMessage id="请输入用户邮箱！" defaultMessage="请输入用户邮箱！" />
              ),
            },
          ]}
        />
        <ProFormText
          name="userName"
          label={intl.formatMessage({
            id: 'system.User.user_name',
            defaultMessage: '用户账号',
          })}
          width="xl"
          hidden={userId}
          placeholder="请输入用户账号"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="请输入用户账号！" defaultMessage="请输入用户账号！" />
              ),
            },
          ]}
        />
        <ProFormText
          name="password"
          label={intl.formatMessage({
            id: 'system.User.password',
            defaultMessage: '密码',
          })}
          width="xl"
          hidden={userId}
          placeholder="请输入密码"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入密码！" defaultMessage="请输入密码！" />,
            },
          ]}
        />
        <ProFormSelect
          valueEnum={sexOptions}
          name="sex"
          label={intl.formatMessage({
            id: 'system.User.sex',
            defaultMessage: '用户性别',
          })}
          width="xl"
          placeholder="请输入用户性别"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: (
                <FormattedMessage id="请输入用户性别！" defaultMessage="请输入用户性别！" />
              ),
            },
          ]}
        />
        <ProFormSelect
          valueEnum={statusOptions}
          name="status"
          label={intl.formatMessage({
            id: 'system.User.status',
            defaultMessage: '帐号状态',
          })}
          width="xl"
          placeholder="请输入帐号状态"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: (
                <FormattedMessage id="请输入帐号状态！" defaultMessage="请输入帐号状态！" />
              ),
            },
          ]}
        />
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
          colProps={{ md: 12, xl: 12 }}
          rules={[{ required: true, message: '请选择岗位!' }]}
        />
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
          colProps={{ md: 12, xl: 12 }}
          rules={[{ required: true, message: '请选择角色!' }]}
        />
        <ProFormTextArea
          name="remark"
          label={intl.formatMessage({
            id: 'system.User.remark',
            defaultMessage: '备注',
          })}
          width="xl"
          placeholder="请输入备注"
          colProps={{ md: 24, xl: 24 }}
          rules={[
            {
              required: false,
              message: <FormattedMessage id="请输入备注！" defaultMessage="请输入备注！" />,
            },
          ]}
        />
      </ProForm>
    </Modal >
  );
};

export default UserForm;
