import { PlusOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, history, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { DictDataType, DictDataListParams } from './data.d';
import {
  getDictDataList,
  removeDictData,
  addDictData,
  updateDictData,
  exportDictData,
} from './service';
import UpdateForm from './components/edit';
import { getDict, getDictType, getDictTypeList } from '../dict/service';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: DictDataType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addDictData({ ...fields });
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
const handleUpdate = async (fields: DictDataType) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updateDictData(fields);
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
const handleRemove = async (selectedRows: DictDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeDictData(selectedRows.map((row) => row.dictCode).join(','));
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

const handleRemoveOne = async (selectedRow: DictDataType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.dictCode];
    const resp = await removeDictData(params.join(','));
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

export type DictTypeArgs = {
  id: string;
};

export type DictDataProps = {
 match?: {
   params: any
 }
} ;

const DictDataTableList: React.FC<DictDataProps> = (props) => {
  const formTableRef = useRef<FormInstance>();

  const [dictId, setDictId] = useState<string>('');

  const [dictType, setDictType] = useState<string>('');

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<DictDataType>();
  const [selectedRowsState, setSelectedRows] = useState<DictDataType[]>([]);

  const [dictTypeOptions, setDictTypeOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);
  
  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    const { id } = props.match?.params as DictTypeArgs;
    if (id === undefined) {
      history.push('/system/dict');
    }
    if (dictId !== id) {
      setDictId(id);
      getDictTypeList().then((res) => {
        if (res.code === 200) {
          const opts = {};
          res.rows.forEach((item: any) => {
            opts[item.dictType] = item.dictName;
          });
          setDictTypeOptions(opts);
        }
      });
      getDict('sys_normal_disable').then((res) => {
        if (res.code === 200) {
          const opts = {};
          res.data.forEach((item: any) => {
            opts[item.dictValue] = item.dictLabel;
          });
          setStatusOptions(opts);
        }
      });
      getDictType(id).then((res) => {
        if (res.code === 200) {
          setDictType(res.data.dictType);
          formTableRef.current?.setFieldsValue({
            dictType: res.data.dictType,
          });
          actionRef.current?.reloadAndRest?.();
        } else {
          message.error(res.msg);
        }
      });
    }
  }, [dictId, dictType, props.match?.params]);

    
  /**
   * 导出数据
   *
   * @param id
   */
  const handleExport = async () => {
    const hide = message.loading('正在导出');
    try {
      await exportDictData({dictType});
      hide();
      message.success('导出成功');    
      return true;
    } catch (error) {
      hide();
      message.error('导出失败，请重试');
      return false;
    }
  };

  const columns: ProColumns<DictDataType>[] = [
    {
      title: <FormattedMessage id="system.DictData.dict_code" defaultMessage="字典编码" />,
      dataIndex: 'dictCode',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.DictData.dict_type" defaultMessage="字典类型" />,
      dataIndex: 'dictType',
      valueType: 'select',
      hideInTable: true,
      valueEnum: dictTypeOptions,
      search: {
        transform: (value) => {
          setDictType(value);
          return value;
        },
      },
    },
    {
      title: <FormattedMessage id="system.DictData.dict_label" defaultMessage="字典标签" />,
      dataIndex: 'dictLabel',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.DictData.dict_value" defaultMessage="字典键值" />,
      dataIndex: 'dictValue',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.DictData.dict_sort" defaultMessage="字典排序" />,
      dataIndex: 'dictSort',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.DictData.status" defaultMessage="状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
    },
    {
      title: <FormattedMessage id="system.DictData.remark" defaultMessage="备注" />,
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
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
          hidden={!access.hasPerms('system:dictData:edit')}
          onClick={() => {
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:dictData:remove')}
          onClick={async () => {
            Modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<DictDataType>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '信息',
          })}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="dictCode"
          key="dictDataList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:dictData:add')}
              onClick={async () => {
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:dictData:remove')}
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
              key="export"
              hidden={!access.hasPerms('system:dictData:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
            <Button
              type="primary"
              key="goBack"
              onClick={async () => {
                history.goBack();
              }}
            >
              <RollbackOutlined />
              <FormattedMessage id="pages.goback" defaultMessage="返回" />
            </Button>,
          ]}
          request={async (params) => {
            if (dictType.length === 0) {
              return {
                data: [],
                total: 0,
                success: true,
              };
            }
            const res = await getDictDataList({ dictType, ...params } as DictDataListParams);
            return {
              data: res.rows,
              total: res.total,
              success: true,
            };
          }}
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
            hidden={!access.hasPerms('system:dictData:remove')}
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
          if (values.dictCode) {
            success = await handleUpdate({ ...values } as DictDataType);
          } else {
            success = await handleAdd({ ...values } as DictDataType);
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
        dictType={dictType}
        statusOptions={statusOptions}
      />
    </WrapContent>
  );
};

export default DictDataTableList;
