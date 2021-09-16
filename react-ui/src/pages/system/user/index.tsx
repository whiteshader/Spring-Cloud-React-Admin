import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
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
import type { UserType, UserListParams } from './data.d';
import {
  getUserList,
  getUser,
  removeUser,
  addUser,
  updateUser,
  exportUser,
  resetPwd,
} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../dict/service';
import ResetPwd from './components/ResetPwd';
import { getTreeList as getDeptTreeList } from '../dept/service';
import DeptTree from './components/DeptTree';
import type { DataNode } from 'antd/lib/tree';


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
const handleAdd = async (fields: UserType) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
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
const handleUpdate = async (fields: UserType) => {
  const hide = message.loading('正在配置');
  try {
    await updateUser(fields);
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
const handleRemove = async (selectedRows: UserType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser(selectedRows.map((row) => row.userId).join(','));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: UserType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.userId];
    await removeUser(params.join(','));
    hide();
    message.success('删除成功，即将刷新');
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
    await exportUser();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

export type UserTableProps = {
  currentUser?: CurrentUser;
} & Partial<ConnectProps>;

const UserTableList: React.FC<UserTableProps> = (props) => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetPwdModalVisible, setResetPwdModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<UserType>();
  const [selectedRowsState, setSelectedRows] = useState<UserType[]>([]);

  const [selectDept, setSelectDept] = useState<any>({ id: 0 });

  const [sexOptions, setSexOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  const [postIds, setPostIds] = useState<string[]>();
  const [postList, setPostList] = useState<string[]>();
  const [roleIds, setRoleIds] = useState<string[]>();
  const [roleList, setRoleList] = useState<string[]>();
  const [deptTree, setDeptTree] = useState<DataNode[]>();

  const { currentUser } = props;
  const { hasPerms } = currentUser || {};

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDict('sys_user_sex').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setSexOptions(opts);
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
  }, []);

  const columns: ProColumns<UserType>[] = [
    {
      title: <FormattedMessage id="编号" defaultMessage="编号" />,
      dataIndex: 'userId',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.User.dept_id" defaultMessage="部门ID" />,
      dataIndex: 'deptId',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.User.user_name" defaultMessage="用户账号" />,
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.User.nick_name" defaultMessage="用户昵称" />,
      dataIndex: 'nickName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.User.email" defaultMessage="用户邮箱" />,
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.User.phonenumber" defaultMessage="手机号码" />,
      dataIndex: 'phonenumber',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="system.User.status" defaultMessage="帐号状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
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
          hidden={!hasPerms('system:user:edit')}
          onClick={() => {
            const fetchUserInfo = async (userId: number) => {
              const res = await getUser(userId);
              // const data = res.data;
              setPostIds(res.postIds);
              setPostList(
                res.posts.map((item: any) => {
                  return {
                    value: item.postId,
                    label: item.postName,
                  };
                }),
              );
              setRoleIds(res.roleIds);
              setRoleList(
                res.roles.map((item: any) => {
                  return {
                    value: item.roleId,
                    label: item.roleName,
                  };
                }),
              );
            };
            fetchUserInfo(record.userId);
            getDeptTreeList({}).then((treeData) => {
              setDeptTree(treeData);
            });
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
          hidden={!hasPerms('system:user:del')}
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
        <Button
          type="link"
          size="small"
          key="resetpwd"
          hidden={!hasPerms('system:user:edit')}
          onClick={() => {
            setResetPwdModalVisible(true);
            setCurrentRow(record);
          }}
        >
          密码重置
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div style={{ width: '20%', height: '100%', float: 'left' }}>
        <DeptTree
          onSelect={async (value: any) => {
            setSelectDept(value);
            // setDeptName(value.name);
            // 查询列表数据
            if (actionRef.current) {
              formTableRef?.current?.submit();
            }
          }}
        />
      </div>
      <div style={{ width: '79%', float: 'right' }}>
        <ProTable<UserType>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '信息',
          })}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="userId"
          key="userList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!hasPerms('system:user:add')}
              onClick={async () => {
                if (selectDept.id === '' || selectDept.id == null) {
                  message.warning('请选择左侧父级节点');
                } else {
                  getDeptTreeList({}).then((treeData) => {
                    setDeptTree(treeData);
                    setCurrentRow(undefined);
                    setModalVisible(true);
                  });
                }
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !hasPerms('system:user:del')}
              onClick={async () => {
                const success = await handleRemove(selectedRowsState);
                if (success) {
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }
              }}
            >
              <DeleteOutlined />{' '}
              <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </Button>,
            <Button
              type="primary"
              key="export"
              hidden={!hasPerms('system:user:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />{' '}
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          request={(params) =>
            getUserList({ ...params, deptId: selectDept.id } as UserListParams).then((res) => {
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
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!hasPerms('system:user:del')}
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
          if (values.userId) {
            success = await handleUpdate({ ...values } as UserType);
          } else {
            success = await handleAdd({ ...values } as UserType);
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
        sexOptions={sexOptions}
        statusOptions={statusOptions}
        posts={postList || []}
        postIds={postIds || []}
        roles={roleList || []}
        roleIds={roleIds || []}
        depts={deptTree || []}
      />

      <ResetPwd
        onSubmit={async (value: any) => {
          const data = { ...value, userId: currentRow?.userId };
          const success = await resetPwd(data);
          if (success) {
            setResetPwdModalVisible(false);
            setSelectedRows([]);
            setCurrentRow(undefined);
            message.success('密码重置成功。');
          }
        }}
        onCancel={() => {
          setResetPwdModalVisible(false);
          setSelectedRows([]);
          setCurrentRow(undefined);
        }}
        resetPwdModalVisible={resetPwdModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

// export default UserTableList;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(UserTableList);