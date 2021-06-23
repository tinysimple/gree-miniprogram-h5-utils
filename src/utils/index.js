// 判断是否在格力+小程序中的h5
export function isGreeMiniProgram(url, queryKey = 'passthrough', customKey = 'origin', customVal = 'greeapp') {
  if (typeof customKey !== 'string') {
    throw new Error(`'isGreeMiniProgram' method param 'customKey' must be type of 'string'`)
  }
  if (typeof customVal !== 'string') {
    throw new Error(`'isGreeMiniProgram' method param 'customVal' must be type of 'string'`)
  }
  const greeParams = getGreeParams(url, queryKey);
  return greeParams[customKey] === customVal;
}

// 获取格力侧自定义参数对象
export function getGreeParams(url, key = 'passthrough') {
  const urlParams = getParams(url);
  if (typeof key !== 'string') {
    throw new Error(`'getGreeParams' method param 'key' must be type of 'string'`)
  }
  const greeParams = urlParams[key];
  if (!greeParams) {
    return {};
  }
  return parse(greeParams);
}

// 获取url中的所有参数信息，返回对象
export function getParams(url) {
  if (url === undefined) {
    if (typeof window !== 'undefined' && window && window.location && window.location.href) {
      url = window.location.href
    } else {
      throw new Error(`'getParams' method param 'url' must exist and is type of 'string'`)
    }
  }
  if (typeof url !== 'string') {
    throw new Error(`'getParams' method param 'url' must be of type 'string'`)
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
  const result = {}
  for(const [queryKey, queryVal] of query.split('&').map(kv => kv.split('='))) {
    const key = decodeURIComponent(queryKey)
    const val = decodeURIComponent(queryVal)
    result[key] = val
  }
  return result;
}

// 根据自定义规则解析自定义参数字符串
function parse(params) {
  const result = {}
  if (params.length <= 2) {
    return {}
  }
  const paramsStr = params.slice(1, params.length - 1)
  for(const [key, val] of paramsStr.split('&').map(kv => kv.split('='))) {
    result[key] = val
  }
  return result;
}

export default {
  isGreeMiniProgram,
  getGreeParams,
  getParams
}
