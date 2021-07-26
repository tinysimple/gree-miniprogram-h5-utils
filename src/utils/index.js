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

/**
 * 合并两个对象的属性
 * @param {Object} obj1
 * @param {Object} obj2
 */
export const merge = (obj1, obj2) => {
  if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    throw new Error('param obj1 and obj2 must be typeof `object`')
  }
  const result = JSON.parse(JSON.stringify(obj1));
    for(const key of Object.keys(obj2)) {
        let item1 = result[key];
        let item2 = obj2[key];
        if (item1 == undefined) {
            result[key] = item2;
        } else if (typeof item1 === 'object' && typeof item2 === 'object' ) {
            result[key] = merge(item1, item2);
        } else {
            result[key] = item2;
        }
    }
    return result;
}

/**
 * 至少millisecond毫秒后才进入决议状态
 * @param {Promise} promise
 * @param {number} millisecond
 */
export const untilFinished = (promise, millisecond) => {
  if (typeof millisecond !== 'number') {
    throw new Error('param millisecond must be type of `number`')
  }
  let promises = []
  if (Array.isArray(promise)) {
    promises = promise.map(item => Promise.resolve(item))
  } else {
    promises = [Promise.resolve(promise)]
  }
  const timeoutPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, millisecond)
    })
  }
  return Promise.all([...promises, timeoutPromise()]).then(resultArr => resultArr.slice(0, -1))
}

/**
 * 深拷贝,可以弥补用JSON.parse和JSON.stringify来拷贝的局限性
 * @param {*} original
 */
export const deepClone = (original) => {
  let newObj;
  if (typeof original === 'object' && original !== null) {
      newObj = original.constructor === Array ? [] : {};
      for(let item in original) {
          newObj[item] = typeof original[item] === 'object' ? deepClone(original[item]) : original[item];
      }
  } else {
      newObj = original;
  }
  return newObj;
}

/**
 * 防抖函数
 * @param {function} fn
 * @param {number} wait
 * @param {boolean} immediate
 */
export const debounce = (fn, wait, immediate) => {
  if (typeof fn !== 'function') {
    throw new Error('param fn must be a `function`')
  }
  if (typeof wait !== 'number') {
    throw new Error('param wait must be a `number`')
  }
  let timer = null;
  const tempFn = function(...args) {
    let content = this
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let isCallNow = !timer
      if (isCallNow) {
        fn.apply(content, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        timer = null
        fn.apply(content, args)
      }, wait)
    }
  }
  return tempFn
}

/**
 * 节流函数
 * @param {function} func
 * @param {number} wait
 */
export const throttle = (func, wait) => {
  let startTime = 0
  return function(...args) {
    let handleTime = +new Date()
    let context = this
    if (handleTime - startTime >= wait) {
        func.apply(context, args)
        startTime = handleTime
    }
  }
}

export default {
  isGreeMiniProgram,
  getGreeParams,
  getParams,
  merge,
  untilFinished,
  deepClone,
  debounce,
  throttle
}
