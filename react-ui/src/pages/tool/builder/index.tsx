import { Card } from 'antd';
import WrapContent from '@/components/WrapContent';
import React from 'react';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {
  return (
    <WrapContent>
      <Card title="Developing" />
    </WrapContent>
  );
};

export default FormBuilder;
