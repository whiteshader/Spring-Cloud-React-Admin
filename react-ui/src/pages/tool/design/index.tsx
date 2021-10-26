import { Card } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import type { ConnectProps } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import { PageContainer } from '@ant-design/pro-layout';

/**
 *
 * @author whiteshader@163.com
 *
 * */

export type FormBuilderProps = {
  currentUser?: CurrentUser;
} & Partial<ConnectProps>;

const FormBuilder: React.FC<FormBuilderProps> = (props) => {

  /** 国际化配置 */
  // const intl = useIntl();
  console.log(props);
  // const { currentUser } = props;
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card title="FormBuilder">        
      </Card>
    </PageContainer>
  );
};

// export default FormBuilder;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(FormBuilder);
