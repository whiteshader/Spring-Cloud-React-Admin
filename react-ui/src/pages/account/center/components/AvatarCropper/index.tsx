import React, { useEffect, useState } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { Form, Modal, Row, Col, Button, Space, Upload } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ConfigType } from '@/pages/system/config/data';
import 'cropperjs/dist/cropper.css';
import { Cropper } from 'react-cropper';
import {
  MinusOutlined,
  PlusOutlined,
  RedoOutlined,
  UndoOutlined,
  UploadOutlined,
} from '@ant-design/icons';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/24
 *
 * */

export type ConfigFormValueType = Record<string, unknown> & Partial<ConfigType>;

export type AvatarCropperProps = {
  onCancel: (flag?: boolean, formVals?: ConfigFormValueType) => void;
  onSubmit: (values: ConfigFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<API.CurrentUser>;
};

const AvatarCropperForm: React.FC<AvatarCropperProps> = (props) => {
  const [form] = Form.useForm();

  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    form.resetFields();
    setPreviewUrl(props.values.avatar);
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleFinish = (values: Record<string, any>) => {
    props.onSubmit(values as ConfigFormValueType);
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  return (
    <Modal
      width={800}
      title={intl.formatMessage({
        id: 'system.User.modify_avatar',
        defaultMessage: '修改头像',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <Cropper
              src={props.values.avatar}
              style={{ height: 400, width: '100%', marginBottom: '16px' }}
              aspectRatio={246 / 346}
              guides={false}
            />
          </Col>
          <Col span={12} order={2}>
            <img src={previewUrl} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6} >
            <Upload>
              <Button>
                <UploadOutlined />
                上传
              </Button>
            </Upload>
          </Col>
          <Col>
            <Space>
              <Button icon={<RedoOutlined />} />
              <Button icon={<UndoOutlined />} />
              <Button icon={<PlusOutlined />} />
              <Button icon={<MinusOutlined />} />
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AvatarCropperForm;
