import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { OperlogType, OperlogListParams } from './data.d';
import {
  getOperlogList,
  removeOperlog,
  addOperlog,
  updateOperlog,
  exportOperlog,
  cleanOperlog,
} from './service';
import DetailForm from './components/detail';
import { getDict } from '@/pages/system/dict/service';
import WrapContent from '@/components/WrapContent';

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
const handleAdd = async (fields: OperlogType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addOperlog({ ...fields });
    hide();
    if(resp.code === 200) {
      message.success('添加成功');
    } else {
      message.error(resp.msg);
    }
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
const handleUpdate = async (fields: OperlogType) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updateOperlog(fields);
    hide();
    if(resp.code === 200) {
      message.success('配置成功');
    } else {
      message.error(resp.msg);
    }
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
const handleRemove = async (selectedRows: OperlogType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeOperlog(selectedRows.map((row) => row.operId).join(','));
    hide();
    if(resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveAll = async () => {
  const hide = message.loading('正在删除');
  try {
    const resp = await cleanOperlog();
    hide();
    if(resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 导出数据
 *
 * @param id
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportOperlog();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};


const OperlogTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<OperlogType>();
  const [selectedRowsState, setSelectedRows] = useState<OperlogType[]>([]);

  const [businessTypeOptions, setBusinessTypeOptions] = useState<any>([]);
  const [operatorTypeOptions, setOperatorTypeOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDict('sys_oper_type').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setBusinessTypeOptions(opts);
      }
    });
    getDict('sys_oper_type').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setOperatorTypeOptions(opts);
      }
    });
    getDict('sys_common_status').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setStatusOptions(opts);
      }
    });
  }, []);

  const columns: ProColumns<OperlogType>[] = [
    {
      title: <FormattedMessage id="monitor.Operlog.oper_id" defaultMessage="日志主键" />,
      dataIndex: 'operId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.title" defaultMessage="所属模块" />,
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Operlog.business_type" defaultMessage="业务类型" />,
      dataIndex: 'businessType',
      valueType: 'select',
      valueEnum: businessTypeOptions,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.method" defaultMessage="方法名称" />,
      dataIndex: 'method',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.request_method" defaultMessage="请求方式" />,
      dataIndex: 'requestMethod',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Operlog.operator_type" defaultMessage="操作类别" />,
      dataIndex: 'operatorType',
      valueType: 'select',
      valueEnum: operatorTypeOptions,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.oper_name" defaultMessage="操作人员" />,
      dataIndex: 'operName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Operlog.dept_name" defaultMessage="部门名称" />,
      dataIndex: 'deptName',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.oper_url" defaultMessage="请求URL" />,
      dataIndex: 'operUrl',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.oper_ip" defaultMessage="主机地址" />,
      dataIndex: 'operIp',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Operlog.oper_location" defaultMessage="操作地点" />,
      dataIndex: 'operLocation',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.Operlog.oper_param" defaultMessage="请求参数" />,
      dataIndex: 'operParam',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.json_result" defaultMessage="返回参数" />,
      dataIndex: 'jsonResult',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.status" defaultMessage="操作状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.error_msg" defaultMessage="错误消息" />,
      dataIndex: 'errorMsg',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="monitor.Operlog.oper_time" defaultMessage="操作时间" />,
      dataIndex: 'operTime',
      valueType: 'dateRange',
      render: (_, record) => <span>{record.operTime}</span>,
      search: {
        transform: (value) => {
          return {
            'params[beginTime]': value[0],
            'params[endTime]': value[1],
          };
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('monitor:operlog:list')}
          onClick={() => {
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="detaile" defaultMessage="Detail" />
        </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<OperlogType>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '信息',
          })}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="operId"
          key="operlogList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !access.hasPerms('monitor:operlog:remove')}
              onClick={async () => {
                confirm({
                  title: '是否确认清空所有登录日志数据项?',
                  icon: <ExclamationCircleOutlined />,
                  content: '请谨慎操作',
                  async onOk() {
                    const success = await handleRemove(selectedRowsState);
                    if (success) {
                      setSelectedRows([]);
                      actionRef.current?.reloadAndRest?.();
                    }
                  },
                  onCancel() {},
                });
              }}
            >
              <DeleteOutlined />
              <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </Button>,
            <Button
              type="primary"
              key="clear"
              hidden={!access.hasPerms('monitor:operlog:remove')}
              onClick={async () => {
                confirm({
                  title: '是否确认清空所有登录日志数据项?',
                  icon: <ExclamationCircleOutlined />,
                  content: '请谨慎操作',
                  async onOk() {
                    handleRemoveAll();
                    actionRef.current?.reloadAndRest?.();
                  },
                  onCancel() {},
                });
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.clear" defaultMessage="清空" />
            </Button>,
            <Button
              type="primary"
              key="export"
              hidden={!access.hasPerms('monitor:operlog:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            getOperlogList({ ...params } as OperlogListParams).then((res) => {
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
            hidden={!access.hasPerms('monitor:operlog:remove')}
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
      <DetailForm
        onSubmit={async (values) => {
          let success = false;
          if (values.operId) {
            success = await handleUpdate({ ...values } as OperlogType);
          } else {
            success = await handleAdd({ ...values } as OperlogType);
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
        businessTypeOptions={businessTypeOptions}
        operatorTypeOptions={operatorTypeOptions}
        statusOptions={statusOptions}
      />
    </WrapContent>
  );
};

export default OperlogTableList;