import { Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type GlobalTableProps = {};

const TableList: React.FC<GlobalTableProps> = () => {
  return (
    <Content>
      <Card title="Gen Code" />
    </Content>
  );
};

// export default TableList;
export default TableList;
