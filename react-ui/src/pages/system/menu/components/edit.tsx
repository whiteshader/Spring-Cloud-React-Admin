import React, { useEffect, useState } from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage, getLocale } from 'umi';
import type { DataNode } from 'antd/lib/tree';
import type { MenuType } from '../data.d';
import IconSelector from '@/components/IconSelector';
import { createIcon } from '@/utils/IconUtil';
import { IntlProvider } from 'react-intl';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

export type MenuFormValueType = Record<string, unknown> & Partial<MenuType>;

export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormValueType) => void;
  onSubmit: (values: MenuFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<MenuType>;
  visibleOptions: any;
  statusOptions: any;
  menuTree: DataNode[];
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const [form] = Form.useForm();

  const [menuTypeId, setMenuTypeId] = useState<any>('');
  const [menuIconName, setMenuIconName] = useState<any>();

  const [previewModalVisible, setPreviewModalVisible] = useState<boolean>(false);

  const { menuTree, visibleOptions, statusOptions } = props;
  useEffect(() => {
    form.resetFields();
    setMenuTypeId(props.values.menuType?props.values.menuType:'C');
    setMenuIconName(props.values.icon);
    form.setFieldsValue({
      menuId: props.values.menuId,
      menuName: props.values.menuName,
      parentId: props.values.parentId,
      orderNum: props.values.orderNum,
      path: props.values.path,
      component: props.values.component,
      isFrame: props.values.isFrame,
      isCache: props.values.isCache,
      menuType: props.values.menuType,
      visible: props.values.visible,
      status: props.values.status,
      perms: props.values.perms,
      icon: props.values.icon,
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
    props.onSubmit(values as MenuFormValueType);
  };

  return (
    <Modal
      width={680}
      title={intl.formatMessage({
        id: 'system.Menu.modify',
        defaultMessage: '编辑菜单',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Modal
        width={1200}
        visible={previewModalVisible}
        onCancel={() => {
          setPreviewModalVisible(false);
        }}
        footer={null}
      >
        <IntlProvider locale={getLocale()}>
          <IconSelector
            onSelect={(name: string) => {
              form.setFieldsValue({ icon: name });
              setMenuIconName(name);
              setPreviewModalVisible(false);
            }}
          />
        </IntlProvider>
      </Modal>

      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={16} order={1}>
            <ProFormDigit
              name="menuId"
              label={intl.formatMessage({
                id: 'system.Menu.menu_id',
                defaultMessage: '菜单ID',
              })}
              width="xl"
              placeholder="请输入菜单ID"
              disabled
              hidden={true}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入菜单ID！" defaultMessage="请输入菜单ID！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} order={1}>
            <ProFormTreeSelect
              name="parentId"
              label={intl.formatMessage({
                id: 'system.Menu.parent_id',
                defaultMessage: '父菜单:',
              })}
              request={async () => {
                return menuTree;
              }}
              width="xl"
              placeholder="请选择父菜单"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请选择父菜单！" defaultMessage="请选择父菜单！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              valueEnum={{
                M: '目录',
                C: '菜单',
                F: '按钮',
              }}
              name="menuType"
              label={intl.formatMessage({
                id: 'system.Menu.menu_type',
                defaultMessage: '菜单类型',
              })}
              fieldProps={{
                onChange: (e) => {
                  setMenuTypeId(e.target.value);
                },
              }}
              initialValue="C"
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="请输入菜单类型"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入菜单类型！" defaultMessage="请输入菜单类型！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              name="icon"
              labelCol={{ span: 24 }}
              allowClear={true}
              hidden={menuTypeId === 'F'}
              addonBefore={createIcon(menuIconName)}
              fieldProps={{
                onClick: () => {
                  setPreviewModalVisible(true);
                },
              }}
              label={intl.formatMessage({
                id: 'system.Menu.icon',
                defaultMessage: '菜单图标:',
              })}
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请选择菜单图标！" defaultMessage="请选择菜单图标！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="menuName"
              label={intl.formatMessage({
                id: 'system.Menu.menu_name',
                defaultMessage: '菜单名称',
              })}
              width="xl"
              placeholder="请输入菜单名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入菜单名称！" defaultMessage="请输入菜单名称！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormDigit
              name="orderNum"
              label={intl.formatMessage({
                id: 'system.Menu.order_num',
                defaultMessage: '显示顺序',
              })}
              initialValue="0"
              width="xl"
              placeholder="请输入显示顺序"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入显示顺序！" defaultMessage="请输入显示顺序！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              name="isFrame"
              valueEnum={{
                0: '是',
                1: '否',
              }}
              initialValue="1"
              label={intl.formatMessage({
                id: 'system.Menu.is_frame',
                defaultMessage: '是否为外链',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId === 'F'}
              placeholder="请输入是否为外链"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入是否为外链！" defaultMessage="请输入是否为外链！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="path"
              label={intl.formatMessage({
                id: 'system.Menu.path',
                defaultMessage: '路由地址',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="请输入路由地址"
              hidden={menuTypeId === 'F'}
              rules={[
                {
                  required: menuTypeId !== 'F',
                  message: (
                    <FormattedMessage id="请输入路由地址！" defaultMessage="请输入路由地址！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="perms"
              label={intl.formatMessage({
                id: 'system.Menu.perms',
                defaultMessage: '权限标识',
              })}
              width="xl"
              placeholder="请输入权限标识"
              hidden={menuTypeId === 'M'}
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入权限标识！" defaultMessage="请输入权限标识！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="component"
              label={intl.formatMessage({
                id: 'system.Menu.component',
                defaultMessage: '组件路径',
              })}
              width="xl"
              placeholder="请输入组件路径"
              hidden={menuTypeId !== 'C'}
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入组件路径！" defaultMessage="请输入组件路径！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="query"
              label={intl.formatMessage({
                id: 'system.Menu.query',
                defaultMessage: '路由参数',
              })}
              width="xl"
              placeholder="请输入权路由参数"
              hidden={menuTypeId !== 'C'}
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入路由参数！" defaultMessage="请输入路由参数！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormRadio.Group
              name="isCache"
              valueEnum={{
                0: '缓存',
                1: '不缓存',
              }}
              initialValue="0"
              label={intl.formatMessage({
                id: 'system.Menu.is_cache',
                defaultMessage: '是否缓存',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId !== 'C'}
              placeholder="请输入是否缓存"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入是否缓存！" defaultMessage="请输入是否缓存！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              valueEnum={visibleOptions}
              name="visible"
              label={intl.formatMessage({
                id: 'system.Menu.visible',
                defaultMessage: '可见状态',
              })}
              initialValue="0"
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId === 'F'}
              placeholder="请输入可见状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入可见状态！" defaultMessage="请输入可见状态！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.Menu.status',
                defaultMessage: '菜单状态',
              })}
              initialValue="0"
              width="xl"
              labelCol={{ span: 24 }}
              hidden={menuTypeId === 'F'}
              placeholder="请输入菜单状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入菜单状态！" defaultMessage="请输入菜单状态！" />
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

export default MenuForm;
