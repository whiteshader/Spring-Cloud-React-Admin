import React from 'react';
import { Result } from 'antd';
import check from './CheckPermissions';
import type { IAuthorityType } from './CheckPermissions';
import type AuthorizedRoute from './AuthorizedRoute';
import type Secured from './Secured';
import type { CurrentUser } from '@/models/user';
import { FormattedMessage } from 'umi';

type AuthorizedProps = {
  authority: IAuthorityType;
  noMatch?: React.ReactNode;
  currentUser?: CurrentUser;
};

type IAuthorizedType = React.FunctionComponent<AuthorizedProps> & {
  Secured: typeof Secured;
  check: typeof check;
  AuthorizedRoute: typeof AuthorizedRoute;
};

const Authorized: React.FunctionComponent<AuthorizedProps> = ({
  children,
  authority,
  currentUser,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle={
        <FormattedMessage
          id="pages.authorized.forbiden"
          defaultMessage="Sorry, you are not authorized to access this page."
        />
      }
    />
  ),
}) => {
  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
  const dom = check(currentUser, authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized as IAuthorizedType;
