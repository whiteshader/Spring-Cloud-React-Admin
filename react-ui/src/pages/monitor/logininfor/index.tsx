import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ConnectProps } from 'umi';
import { useIntl, FormattedMessage, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { LogininforType, LogininforListParams } from './data.d';
import {
  getLogininforList,
  removeLogininfor,
  addLogininfor,
  updateLogininfor,
  exportLogininfor,
  cleanLogininfor,
} from './service';
import UpdateForm from './components/edit';
import { getDict } from '@/pages/system/dict/service';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

const { confirm } = Modal;

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: LogininforType) => {
  const hide = message.loading('正在添加');
  try {
    await addLogininfor({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: LogininforType) => {
  const hide = message.loading('正在配置');
  try {
    await updateLogininfor(fields);
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: LogininforType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeLogininfor(selectedRows.map((row) => row.infoId).join(','));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveAll = async () => {
  confirm({
    title: '是否确认清空所有登录日志数据项?',
    icon: <ExclamationCircleOutlined />,
    content: '请谨慎操作',
    async onOk() {
      const hide = message.loading('正在删除');
      try {
        await cleanLogininfor();
        hide();
        message.success('删除成功，即将刷新');
        return true;
      } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
      }
    },
    onCancel() {},
  });
};

/**
 * 导出数据
 *
 * @param id
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportLogininfor();
    message.success('导出成功');    
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

export type LogininforTableProps = {
  currentUser?: CurrentUser;
} & Partial<ConnectProps>;

const LogininforTableList: React.FC<LogininforTableProps> = (props) => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<LogininforType>();
  const [selectedRowsState, setSelectedRows] = useState<LogininforType[]>([]);

  const [statusOptions, setStatusOptions] = useState<any>([]);

  const { currentUser } = props;
  const { hasPerms } = currentUser || {};

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDict('sys_yes_no').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setStatusOptions(opts);
      }
    });
  }, []);

  const columns: ProColumns<LogininforType>[] = [
    {
      title: <FormattedMessage id="monitor.Logininfor.info_id" defaultMessage="访问ID" />,
      dataIndex: 'infoId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.user_name" defaultMessage="用户账号" />,
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.ipaddr" defaultMessage="登录IP地址" />,
      dataIndex: 'ipaddr',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.login_location" defaultMessage="登录地点" />,
      dataIndex: 'loginLocation',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.browser" defaultMessage="浏览器类型" />,
      dataIndex: 'browser',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.os" defaultMessage="操作系统" />,
      dataIndex: 'os',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.status" defaultMessage="登录状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.msg" defaultMessage="提示消息" />,
      dataIndex: 'msg',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Logininfor.login_time" defaultMessage="访问时间" />,
      dataIndex: 'loginTime',
      valueType: 'dateRange',
      render: (_, record) => <span>{record.loginTime}</span>,
      search: {
        transform: (value) => {
          return {
            'params[beginTime]': value[0],
            'params[endTime]': value[1],
          };
        },
      },
    },
  ];

  return (
    <PageContainer>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<LogininforType>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '信息',
          })}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="infoId"
          key="logininforList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !hasPerms('monitor:logininfor:remove')}
              onClick={async () => {
                const success = await handleRemove(selectedRowsState);
                if (success) {
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }
              }}
            >
              <DeleteOutlined />
              <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </Button>,
            <Button
              type="primary"
              key="clear"
              hidden={!hasPerms('monitor:logininfor:remove')}
              onClick={async () => {
                handleRemoveAll();
                actionRef.current?.reloadAndRest?.();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.clear" defaultMessage="清空" />
            </Button>,
            <Button
              type="primary"
              key="export"
              hidden={!hasPerms('monitor:logininfor:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            getLogininforList({ ...params } as LogininforListParams).then((res) => {
              const result = {
                data: res.rows,
                total: res.total,
                success: true,
              };
              return result;
            })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </div>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!hasPerms('monitor:logininfor:remove')}
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemove(selectedRowsState);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.infoId) {
            success = await handleUpdate({ ...values } as LogininforType);
          } else {
            success = await handleAdd({ ...values } as LogininforType);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        visible={modalVisible}
        values={currentRow || {}}
        statusOptions={statusOptions}
      />
    </PageContainer>
  );
};

// export default LogininforTableList;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(LogininforTableList);
