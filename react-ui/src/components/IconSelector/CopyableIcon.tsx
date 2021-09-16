import * as React from 'react';
import { Badge } from 'antd';
import classNames from 'classnames';
import * as AntdIcons from '@ant-design/icons';
import type { ThemeType } from './index';

const allIcons: Record<string, any> = AntdIcons;

export interface CopyableIconProps {
  name: string;
  isNew: boolean;
  theme: ThemeType;
  justCopied: string | null;
  onSelect: (name: string) => any;
}

const CopyableIcon: React.FC<CopyableIconProps> = ({
  name,
  isNew,
  justCopied,
  theme,
  onSelect,
}) => {
  const className = classNames({
    copied: justCopied === name,
    [theme]: !!theme,
  });
  return (
    <li
      className={className}
      onClick={() => {
        if (onSelect) {
          onSelect(name);
        }
      }}
    >
      {React.createElement(allIcons[name])}
      <span className="anticon-class">
        <Badge dot={isNew}>{name}</Badge>
      </span>
    </li>
  );
};

export default CopyableIcon;
