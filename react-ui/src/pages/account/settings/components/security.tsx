import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';

import { List, message } from 'antd';
import ResetPwd from '@/pages/system/user/components/ResetPwd';
import { resetPwd } from '@/pages/system/user/service';

type Unpacked<T> = T extends (infer U)[] ? U : T;
export interface SecurityProps {
  userId: string;  
}

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountandsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountandsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountandsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component<SecurityProps> {

  state = {
    resetPwdModalVisible: false,
  };

  resSetPassword() {
    this.setState({
      resetPwdModalVisible: true,
    });
  }

  getData = () => [
    {
      title: formatMessage({ id: 'accountandsettings.security.password' }, {}),
      description: (
        <>
          {formatMessage({ id: 'accountandsettings.security.password-description' })}：
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <a
          key="Modify"
          onClick={() => {
            this.resSetPassword();
          }}
        >
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountandsettings.security.phone' }, {}),
      description: `${formatMessage(
        { id: 'accountandsettings.security.phone-description' },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountandsettings.security.question' }, {}),
      description: formatMessage({ id: 'accountandsettings.security.question-description' }, {}),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountandsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountandsettings.security.email' }, {}),
      description: `${formatMessage(
        { id: 'accountandsettings.security.email-description' },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountandsettings.security.mfa' }, {}),
      description: formatMessage({ id: 'accountandsettings.security.mfa-description' }, {}),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountandsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    console.log(this.props)
    const data = this.getData();
    return (
      <>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <ResetPwd
          onSubmit={async (value: any) => {
            const userData = { ...value, userId: this.props.userId };
            const success = await resetPwd(userData);
            if (success) {
              this.setState({
                resetPwdModalVisible: false,
              });
              message.success('密码重置成功。');
            }
          }}
          onCancel={() => {
            this.setState({
              resetPwdModalVisible: false,
            });
          }}
          resetPwdModalVisible={this.state.resetPwdModalVisible}
          values={{}}
        />
      </>
    );
  }
}

export default SecurityView;
