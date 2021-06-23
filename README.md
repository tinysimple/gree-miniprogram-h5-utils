# gree-miniprogram-h5-utils

> 格力+小程序h5的工具包，不依赖于任何框架，可在任何项目中安装使用。

## 安装

1、Using npm
``` bash
npm i -S gree-miniprogram-h5-utils
```

2、Using yarn
``` bash
yarn add gree-miniprogram-h5-utils
```

## 使用方式：
1、ES6模块引入
``` bash

第一种：（推荐使用此方式）
  // 引入
  import { isGreeMiniProgram } from 'gree-miniprogram-h5-utils';
  // 使用
  const isInGreeMiniProgramEnv = isGreeMiniProgram();
  if (isInGreeMiniProgramEnv) {
    // ...
  } else {
    // ...
  }


第二种：
  // 引入
  import greeMiniprogramH5Utils from 'gree-miniprogram-h5-utils';
  // 或者 import * as greeMiniprogramH5Utils from 'gree-miniprogram-h5-utils';
  // 使用
  greeMiniprogramH5Utils.isGreeMiniProgram();

```

2、CommonJS模块引入
``` bash
  const { isGreeMiniProgram } = require('gree-miniprogram-h5-utils')
```

---
---
---

## 当前支持的工具函数
> <code>boolean isGreeMiniProgram(url?:string = window.location.href, queryKey?:string = 'passthrough', customKey?:string = 'origin', customVal?:string = 'greeapp')</code>  ——判断当前h5是否在gree+小程序主体中加载。

&emsp;&emsp;<code>url</code>（非必填）：字符串类型；h5的访问地址，若不填写该参数时，将window.location.href作为判断的url；若不填写该参数且window.location.href属性不存在时，会抛出一个异常。

&emsp;&emsp;<code>queryKey</code>（非必填）：字符串类型；指定url中的query的具体key为存放自定义数据的key，默认为 `passthrough`；

&emsp;&emsp;<code>customKey</code>（非必填）：字符串类型；自定义数据中表示是否在格力+主体中的key，默认为`origin`。

&emsp;&emsp;<code>customVal</code>（非必填）：字符串类型；自定义数据中表示是否在格力+主体中的key对应的值，默认为`greeapp`。

---

> <code>object getParams(url?: string = window.location.href)</code>  ——获取当前url的所有参数

---

> <code>object getGreeParams(url?: string = window.location.href, key?: string = 'passthrough')</code>  ——获取格力侧自定义参数
