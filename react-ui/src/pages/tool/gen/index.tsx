import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React, { useEffect } from 'react';
import type { ConnectProps } from 'umi';
import { connect } from 'umi';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type GlobalTableProps = {
  currentUser?: CurrentUser;
} & Partial<ConnectProps>;

const TableList: React.FC<GlobalTableProps> = () => {
  /** 国际化配置 */
  // const intl = useIntl();

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card title="Gen Code"></Card>
    </PageContainer>
  );
};

// export default TableList;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(TableList);
