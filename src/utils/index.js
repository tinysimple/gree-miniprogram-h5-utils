export function isGreeMiniProgram(
  url,
  key = "passThroughParams",
  value = "greeapp"
) {
  if (url === undefined) {
    if (
      typeof window !== "undefined" &&
      window &&
      window.location &&
      window.location.href
    ) {
      url = window.location.href;
    } else {
      throw new Error(
        `'isGreeMiniProgram' method param 'url' must exist and is type of 'string'`
      );
    }
  }
  if (typeof url !== "string") {
    throw new Error(
      `'isGreeMiniProgram' method param 'url' must be of type 'string'`
    );
  }
  if (typeof key !== "string") {
    throw new Error(
      `'isGreeMiniProgram' method param 'key' must be of type 'string'`
    );
  }
  if (typeof value !== "string") {
    throw new Error(
      `'isGreeMiniProgram' method param 'value' must be of type 'string'`
    );
  }
  if (!url) {
    return false;
  }
  url = decodeURIComponent(url);
  const queryAndHash = url.split("?")[1];
  if (!queryAndHash) {
    return false;
  }
  const query = queryAndHash.split("#")[0];
  if (!query) {
    return false;
  }
  for (const [queryKey, queryVal] of query
    .split("&")
    .map(kv => kv.split("="))) {
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

export function getParams(url, key = "passThroughParams") {
  // 如果没传url
  if (url === undefined) {
    if (
      typeof window !== "undefined" &&
      window &&
      window.location &&
      window.location.href
    ) {
      // 则默认使用window.location.href
      url = window.location.href;
    } else {
      // 否则抛出异常
      throw new Error(
        `'isGreeMiniProgram' method param 'url' must exist and is type of 'string'`
      );
    }
  }
  // 如果给了url，就判断是否为字符串
  if (typeof url !== "string") {
    throw new Error(
      `'isGreeMiniProgram' method param 'url' must be of type 'string'`
    );
  }
  if (typeof key !== "string") {
    throw new Error(
      `'isGreeMiniProgram' method param 'key' must be of type 'string'`
    );
  }
  const queryAndHash = url.split("?")[1];
  if (!queryAndHash) {
    return null;
  }

  const query = queryAndHash.split("#")[0];
  if (!query) {
    return null;
  }
  for (const [queryKey, queryVal] of query
    .split("&")
    .map(kv => kv.split("="))) {
    console.log("wwj queryKey, queryVal", queryKey, queryVal);
    if (queryKey === key) {
      let pal = decodeURIComponent(queryVal);
      return parseScanCodeUrl(pal.substr(1, pal.length - 2));
    }
  }

  return url;
}

function parseScanCodeUrl(url) {
  // 创建目标对象
  let tempUrlResult = {};
  // 截取数据字符串,将数据字符串表现为数组
  let tempUrlData = url.split("&");
  for (let i = 0; i < tempUrlData.length; i++) {
    // 数据属性与数值分离
    let item = tempUrlData[i].split("=");
    // 使用属性括号进行属性赋值
    tempUrlResult[item[0]] = item[1];
  }
  console.log(tempUrlResult);
  return tempUrlResult;
}

export default {
  isGreeMiniProgram,
  getParams
};
