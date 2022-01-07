import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { Tabs } from 'antd';
import { context, Provider as TabsProvider } from './context';
import type { UmiComponentProps, Tab, Position, ContextMenuLabels } from './types';
import { CONTEXT_ACTIONS } from './types';
import { isTabActive, getTabKeyFromLocation } from './utils';
import ContextMenu from './ContextMenu';
import styles from './index.less';
import { useIntl } from 'umi';

const { TabPane } = Tabs;

/**
 * TabBar component placed on top of a page
 */
const TabBar: React.FC<{
  location: any;
  history: any;
  defaultChildren: React.ReactNode;
  contextMenuLabels?: ContextMenuLabels
}> = props => {
  const [targetTab, setTargetTab] = useState<Tab>();
  const [position, setPosition] = useState<Position>();
  const store = useContext(context);
  const { tabs, dispatch } = store;
  const intl = useIntl();
  const { location, defaultChildren, history, contextMenuLabels } = props;


  const isLocationInTab = useMemo(() => {
    return tabs.some(
      tab => getTabKeyFromLocation(tab.location) === getTabKeyFromLocation(location)
    );
  }, [location, tabs]);


  const handleTabChange = useCallback((key)=>{
    const tab = tabs.find((t) => getTabKeyFromLocation(t.location)  === key);
    if (tab && !isTabActive(key, location)) {
      const {query, pathname, hash} = tab.location;
      history.push({pathname, query, hash});
    }
  }, [tabs, location, history])
  /**
   * Handle tab remove
   * @param tabKey Key of tab to be removed
   * @param action Name of action
   */
  const handleEdit = (tabKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const tabIndex = tabs.findIndex(tab => getTabKeyFromLocation(tab.location) === tabKey);
      if (tabIndex < 0) return;
      let nextActiveTab;
      if (isTabActive(tabKey, location)) {
        nextActiveTab = tabs[tabIndex + 1] ||
          tabs[tabIndex - 1] || { location: {pathname: '/'} };
      }
      if (nextActiveTab) {
        const {query, pathname, hash} = nextActiveTab.location;
        history.push({pathname, query, hash});
      }
      const newTabs = [...tabs];
      newTabs.splice(tabIndex, 1);
      dispatch({
        type: CONTEXT_ACTIONS.UPDATE_TABS,
        payload: newTabs,
      });
    }
  };

  /**
   * Show context menu when right click tab menus
   */
  const handleContextMenu = (e: React.MouseEvent, tab: Tab) => {
    e.preventDefault();
    setTargetTab(tab);
    setPosition({ x: e.clientX, y: e.clientY });
  }

  const attachEvents = () => {
    function cleanTargetTab() {
      setTargetTab(undefined)
    }
    document.addEventListener('click', cleanTargetTab);
    return () => {
      document.removeEventListener('click', cleanTargetTab);
    }
  }

  useEffect(attachEvents, []);

  return (
    <div className='ant-page-tabs'>
      <Tabs
        className='ant-page-tab-list'
        hideAdd
        type="editable-card"
        onChange={handleTabChange}
        onEdit={handleEdit}
        activeKey={getTabKeyFromLocation(location)}
      >
        {tabs.map(tab => {
          return (
            <TabPane
              tab={
                <span
                  onContextMenu={(e) => { handleContextMenu(e, tab) }}
                  className={styles.tabLabel}
                >
                  { tab.route.title?intl.formatMessage({ id: tab.route.title, defaultMessage: tab.route.name }):tab.route.name}
                </span>
              }
              key={getTabKeyFromLocation(tab.location)}>
              {tab.children}
            </TabPane>
          );
        })}
      </Tabs>
      {!isLocationInTab && defaultChildren}
      <ContextMenu
        activeKey={getTabKeyFromLocation(location)}
        tab={targetTab}
        position={position}
        history={history}
        handleTabClose={handleEdit}
        menuLabels={contextMenuLabels}
      />
    </div>
  );
};

interface TabLayoutProps extends UmiComponentProps {
  contextMenuLabels?: ContextMenuLabels
}

const TabLayout: React.FC<TabLayoutProps> = props => {
  const { children, location, history, contextMenuLabels } = props;

  return (
    <TabsProvider>
      <TabBar
        history={history}
        location={location}
        defaultChildren={children}
        contextMenuLabels={contextMenuLabels}
      />
    </TabsProvider>
  );
};

export default TabLayout;
