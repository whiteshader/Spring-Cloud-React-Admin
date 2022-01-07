import React from 'react';
import { useContext, useEffect } from 'react';
import { context } from './context';
import type { UmiComponentProps } from './types';
import { CONTEXT_ACTIONS } from './types';
import { isLocationChanged } from './utils';

const RouteWatcher: React.FC<UmiComponentProps> = props => {
  const store = useContext(context);
  const { tabs, dispatch } = store;
  const { children, route, location } = props;

  const updateTabs = () => {
    const newTabs = [...tabs];
    const exists = newTabs.find(t => t.route.path === route.path);
    const tab = { route, location, children };
    if (!exists) {
      newTabs.push(tab);
    } else if (isLocationChanged(exists.location, location)) {
      // if tab of same route alreay exists and location change, replace the old with the new one
      newTabs.splice(newTabs.indexOf(exists), 1, tab);
    }
    dispatch({
      type: CONTEXT_ACTIONS.UPDATE_TABS,
      payload: newTabs,
    });
  };

  useEffect(updateTabs, []);
  return null;
};

export default RouteWatcher;
