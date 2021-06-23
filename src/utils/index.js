export function isGreeMiniProgram(url, key = 'passThroughParams', value = 'greeapp') {
  if (url === undefined) {
    if (typeof window !== 'undefined' && window && window.location && window.location.href) {
      url = window.location.href
    } else {
      throw new Error(`'isGreeMiniProgram' method param 'url' must exist and is type of 'string'`)
    }
  }
  if (typeof url !== 'string') {
    throw new Error(`'isGreeMiniProgram' method param 'url' must be of type 'string'`)
  }
  if (typeof key !== 'string') {
    throw new Error(`'isGreeMiniProgram' method param 'key' must be of type 'string'`)
  }
  if (typeof value !== 'string') {
    throw new Error(`'isGreeMiniProgram' method param 'value' must be of type 'string'`)
  }
  if (!url) {
    return false;
  }
  const queryAndHash = url.split('?')[1];
  if (!queryAndHash) {
    return false;
  }
  const query = queryAndHash.split('#')[0];
  if (!query) {
    return false;
  }
  for(const [queryKey, queryVal] of query.split('&').map(kv => kv.split('='))) {
    if (queryKey === key) {
      if (queryVal === value) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}

export default {
  isGreeMiniProgram
}
