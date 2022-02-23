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
      <Card title="Developing 开发中，请给个星星支持支持！" />
    </Content>
  );
};

// export default TableList;
export default TableList;
