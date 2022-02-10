import { Card } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {
  return (
    <PageContainer>
      <Card title="FormBuilder" />
    </PageContainer>
  );
};

export default FormBuilder;
