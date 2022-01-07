import isEqual from 'lodash/isEqual';


export function getTabKeyFromLocation(location: { pathname: any; search: any; hash: any; query: any; }): string {
  const { pathname, hash, query } = location;
  const queryStr = Object.entries(query).map(item=>item.join('=')).join('&');
  return `${pathname}${queryStr}${hash}`;
}

export function isTabActive(tabKey: string, location: any) {
  return tabKey === getTabKeyFromLocation(location);
}

export function isLocationChanged(prevLoca: any, currLoca: any) {
  const { key, search, ...otherPrevloca } = prevLoca;
  const { key: currKey, search: currSearch, ...otherCurrloca } = currLoca;

  if (otherPrevloca.query) {
    for (const key in otherPrevloca.query) {
      otherPrevloca.query[key] = String(otherPrevloca.query[key]);
    }
  }
  if (otherCurrloca.query) {
    for (const key in otherCurrloca.query) {
      otherCurrloca.query[key] = String(otherCurrloca.query[key]) ;
    }
  }

  return !isEqual(otherPrevloca, otherCurrloca);
}
