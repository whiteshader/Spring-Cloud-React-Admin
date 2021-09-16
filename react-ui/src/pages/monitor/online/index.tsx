import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useRef, useEffect } from 'react';
import type { ConnectProps } from 'umi';
import { useIntl, FormattedMessage, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { OnlineUserType, OnlineUserListParams } from './data.d';
import { getOnlineUserList, forceLogout } from './service';


/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 * 
 * */


const handleRemoveOne = async (selectedRow: OnlineUserType) => {
  const hide = message.loading('正在强制下线');
  try {
    await forceLogout(selectedRow.tokenId);
    hide();
    message.success('强制下线成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('强制下线失败，请重试');
    return false;
  }
};

export type OnlineUserTableProps = {
  currentUser?: CurrentUser;
} & Partial<ConnectProps>;

const OnlineUserTableList: React.FC<OnlineUserTableProps> = (props) => {
  const formTableRef = useRef<FormInstance>();

  const actionRef = useRef<ActionType>();

  const { currentUser } = props;
  const { hasPerms } = currentUser || {};

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {}, []);

  const columns: ProColumns<OnlineUserType>[] = [
    {
      title: <FormattedMessage id="monitor.OnlineUser.token_id" defaultMessage="会话编号" />,
      dataIndex: 'tokenId',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.user_name" defaultMessage="用户账号" />,
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.dept_name" defaultMessage="部门名称" />,
      dataIndex: 'deptName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.ipaddr" defaultMessage="登录IP地址" />,
      dataIndex: 'ipaddr',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.login_location" defaultMessage="登录地点" />,
      dataIndex: 'loginLocation',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.browser" defaultMessage="浏览器类型" />,
      dataIndex: 'browser',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.os" defaultMessage="操作系统" />,
      dataIndex: 'os',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="monitor.OnlineUser.login_time" defaultMessage="登录时间" />,
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
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!hasPerms('system:user:del')}
          onClick={async () => {
            Modal.confirm({
              title: '强踢',
              content: '确定强制将该用户踢下线吗？',
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
          强退
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<OnlineUserType>
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
          request={(params) =>
            getOnlineUserList({ ...params } as OnlineUserListParams).then((res) => {
              const result = {
                data: res.rows,
                total: res.total,
                success: true,
              };
              return result;
            })
          }
          columns={columns}
        />
      </div>
    </PageContainer>
  );
};

// export default OnlineUserTableList;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(OnlineUserTableList);
