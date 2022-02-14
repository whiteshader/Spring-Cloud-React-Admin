import * as React from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import { Radio, Input, Empty, Tabs, Row, Col } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio/interface';
import { injectIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import Category from './Category';
import type { Categories, CategoriesKeys } from './fields';
import { categories } from './fields';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import { Fragment } from 'react';

const { TabPane } = Tabs;

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

const allIcons: Record<string, any> = AntdIcons;

interface IconSelectorProps {
  intl: any;
  onSelect: any;
}

interface IconSelectorState {
  theme: ThemeType;
  searchKey: string;
}

class IconSelector extends React.PureComponent<IconSelectorProps, IconSelectorState> {
  static categories: Categories = categories;

  static newIconNames: string[] = [];

  state: IconSelectorState = {
    theme: ThemeType.Outlined,
    searchKey: '',
  };

  constructor(props: IconSelectorProps) {
    super(props);
    this.handleSearchIcon = debounce(this.handleSearchIcon, 300);
  }

  handleChangeTheme = (e: RadioChangeEvent) => {
    this.setState({
      theme: e.target.value as ThemeType,
    });
  };

  handleSearchIcon = (searchKey: string) => {
    this.setState((prevState) => ({
      ...prevState,
      searchKey,
    }));
  };

  getTitle(cate: string) {
    const titles = {
      direction: '方向性图标',
      suggestion: '提示建议性图标',
      editor: '编辑类图标',
      data: '数据类图标',
      logo: '品牌和标识',
      other: '网站通用图标',
    };
    return titles[cate];
  }

  renderTabs() {
    const { searchKey = '', theme } = this.state;
    const { onSelect } = this.props;

    const categoriesResult = Object.keys(categories)
      .map((key: any) => {
        let iconList = categories[key];
        if (searchKey) {
          const matchKey = searchKey
            .replace(new RegExp(`^<([a-zA-Z]*)\\s/>$`, 'gi'), (_, name) => name)
            .replace(/(Filled|Outlined|TwoTone)$/, '')
            .toLowerCase();
          iconList = iconList.filter((iconName: string) =>
            iconName.toLowerCase().includes(matchKey),
          );
        }
        // CopyrightCircle is same as Copyright, don't show it
        iconList = iconList.filter((icon: string) => icon !== 'CopyrightCircle');
        return {
          category: key,
          icons: iconList
            .map((iconName: ThemeType) => iconName + theme)
            .filter((iconName: string | number) => allIcons[iconName]),
        };
      })
      .filter(({ icons }) => !!icons.length)
      .map(({ category, icons }) => (
        <TabPane tab={this.getTitle(category)} key={category}>
          <Category
            key={category}
            title={category as CategoriesKeys}
            theme={theme}
            icons={icons}
            newIcons={IconSelector.newIconNames}
            onSelect={(name) => {
              if (onSelect) {
                onSelect(name, allIcons[name]);
              }
            }}
          />
        </TabPane>
      ));
    return categoriesResult.length === 0 ? <Empty style={{ margin: '2em 0' }} /> : categoriesResult;
  }

  render() {
    const {
      intl: { messages },
    } = this.props;
    return (
      <Fragment>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Radio.Group
              value={this.state.theme}
              onChange={this.handleChangeTheme}
              size="large"
              buttonStyle="solid"
            >
              <Radio.Button value={ThemeType.Outlined}>
                <Icon component={OutlinedIcon} /> {messages['app.docs.components.icon.outlined']}
              </Radio.Button>
              <Radio.Button value={ThemeType.Filled}>
                <Icon component={FilledIcon} /> {messages['app.docs.components.icon.filled']}
              </Radio.Button>
              <Radio.Button value={ThemeType.TwoTone}>
                <Icon component={TwoToneIcon} /> {messages['app.docs.components.icon.two-tone']}
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={18}>
            <Input.Search
              style={{ margin: '0 10px', flex: 1 }}
              allowClear
              onChange={(e) => this.handleSearchIcon(e.currentTarget.value)}
              size="large"
              autoFocus
              // suffix={<IconPicSearcher />}
            />
          </Col>
        </Row>
        <Row>
          <Tabs defaultActiveKey="1">{this.renderTabs()}</Tabs>
        </Row>
      </Fragment>
    );
  }
}

export default injectIntl(IconSelector);
