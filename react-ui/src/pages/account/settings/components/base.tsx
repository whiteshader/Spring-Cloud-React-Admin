import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message, Form } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { queryCurrentUserInfo } from '../service';

import styles from './BaseView.less';
import { useRequest } from 'umi';

// const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
//   if (!value[0]) {
//     callback('Please input your area code!');
//   }
//   if (!value[1]) {
//     callback('Please input your phone number!');
//   }
//   callback();
// };
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {

  const [form] = Form.useForm();
  //  获取用户信息
  const { data: userInfo, loading } = useRequest(() => {
    return queryCurrentUserInfo();
  });

  const currentUser = userInfo?.user;

  if (!currentUser) {
    return loading;
  }

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    }
    return '';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  }; 

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <ProForm
          layout="vertical"
          onFinish={handleFinish}
          form={form}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              children: '更新基本信息',
            },
          }}
          initialValues={{
            ...currentUser,
            email: currentUser?.email,
            phone: currentUser?.phonenumber,
          }}
          hideRequiredMark
        >
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            rules={[
              {
                required: true,
                message: '请输入您的邮箱!',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="userName"
            label="用戶名"
            disabled={true}
            rules={[
              {
                required: true,
                message: '请输入您的用戶名!',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="nickName"
            label="昵称"
            rules={[
              {
                required: true,
                message: '请输入您的昵称!',
              },
            ]}
          />
          <ProFormTextArea
            name="remark"
            label="个人简介"
            rules={[
              {
                required: true,
                message: '请输入个人简介!',
              },
            ]}
            placeholder="个人简介"
          />
          <ProFormSelect
            width="sm"
            name="country"
            label="国家/地区"
            rules={[
              {
                required: true,
                message: '请输入您的国家或地区!',
              },
            ]}
            options={[
              {
                label: '中国',
                value: 'China',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="address"
            label="街道地址"
            rules={[
              {
                required: true,
                message: '请输入您的街道地址!',
              },
            ]}
          />
          <ProFormText
            name="phonenumber"
            label="联系电话"
            rules={[
              {
                required: true,
                message: '请输入您的联系电话!',
              },
              // { validator: validatorPhone },
            ]}
          />
        </ProForm>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={getAvatarURL()} />
      </div>
    </div>
  );
};

export default BaseView;
