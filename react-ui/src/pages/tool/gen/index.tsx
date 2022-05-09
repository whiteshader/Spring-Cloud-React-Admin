import { Card } from 'antd';
import WrapContent from '@/components/WrapContent';
import React from 'react';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type GlobalTableProps = {};

const TableList: React.FC<GlobalTableProps> = () => {
  return (
    <WrapContent>
      <Card title="Developing 开发中，请给个星星支持支持！" />
    </WrapContent>
  );
};

// export default TableList;
export default TableList;
