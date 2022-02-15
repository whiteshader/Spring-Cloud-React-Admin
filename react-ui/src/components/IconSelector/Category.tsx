import * as React from 'react';
import { message } from 'antd';
import { injectIntl } from 'react-intl';
import CopyableIcon from './CopyableIcon';
import type { ThemeType } from './index';
import type { CategoriesKeys } from './fields';
import styles from './style.less';

interface CategoryProps {
  title: CategoriesKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: string[];
  intl: any;
  onSelect: (name: string) => any;
}

interface CategoryState {
  justCopied: string | null;
}

class Category extends React.Component<CategoryProps, CategoryState> {
  copyId?: number;

  state = {
    justCopied: null,
  };

  componentWillUnmount() {
    window.clearTimeout(this.copyId);
  }

  onSelect = (name: string) => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(name);
    }
    message.success(
      <span>
        <code className="copied-code">{name}</code> selected 🎉
      </span>,
    );
    this.setState({ justCopied: name }, () => {
      this.copyId = window.setTimeout(() => {
        this.setState({ justCopied: null });
      }, 2000);
    });
  };

  render() {
    const {
      icons,
      title,
      newIcons,
      theme,
      intl: { messages },
    } = this.props;
    const items = icons.map((name) => (
      <CopyableIcon
        key={name}
        name={name}
        theme={theme}
        isNew={newIcons.indexOf(name) >= 0}
        justCopied={this.state.justCopied}
        onSelect={this.onSelect}
      />
    ));

    return (
      <div>
        <h3>{messages[`app.docs.components.icon.category.${title}`]}</h3>
        <ul className={styles.anticonsList}>{items}</ul>
      </div>
    );
  }
}

export default injectIntl(Category);
