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
> <code>boolean isGreeMiniProgram(url?:string = window.location.href, key?:string = 'passThroughParams', value?:string = 'greeapp')</code>  ——判断当前h5是否在gree+小程序主体中加载。

&emsp;&emsp;<code>url</code>（非必填）：字符串类型；h5的访问地址，若不填写该参数时，将window.location.href作为判断的url；若不填写该参数且window.location.href属性不存在时，会抛出一个异常。

&emsp;&emsp;<code>key</code>（非必填）：字符串类型；根据url中的query的具体key来判断，默认为 `passThroughParams`；

&emsp;&emsp;<code>value</code>（非必填）：字符串类型；根据key对应的值来作为判断条件，默认为`greeapp`。

