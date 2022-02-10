import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type GlobalTableProps = {};

const TableList: React.FC<GlobalTableProps> = () => {
  return (
    <PageContainer>
      <Card title="Gen Code" />
    </PageContainer>
  );
};

// export default TableList;
export default TableList;
