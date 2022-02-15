import { Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {
  return (
    <Content>
      <Card title="FormBuilder" />
    </Content>
  );
};

export default FormBuilder;
