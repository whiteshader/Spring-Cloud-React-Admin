export enum CONTEXT_ACTIONS {
  UPDATE_TABS,
}

/**
 * Tab object
 */
export interface Tab {
  route: any;
  location: any;
  children: React.ReactNode;
  query?: any,
  pathname?: any,
  hash?: any,
}

/**
 * Context state to store tab informations
 */
export interface ContextState {
  tabs: Tab[];
  dispatch: any;
}

/**
 * Context action to update context state
 */
export interface ContextAction {
  type: CONTEXT_ACTIONS;
  payload: Tab[];
}

export interface UmiComponentProps {
  children: React.ReactNode;
  history?: any;
  location?: any;
  match?: { isExact: boolean; params: any; path: string; url: string };
  route?: any;
  routes?: any[];
}

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuLabels {
  closeTab?: string,
  closeRightTabs?: string,
  closeAllTabs?: string
}