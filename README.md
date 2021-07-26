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

---

> <code>object merge(obj1: object, obj2: object)</code>  ——合并两个对象的内容

---

> <code>Pormise untilFinished(promise: Promise | Promise[], millisecond: number)</code>  ——至少millisecond毫秒后才完成（可以用在loading状态处理：获取后端数据时显示loading状态，获取完成后取消显示loading状态，但如果后端返回较快，loading会闪一下立马消失）

---

> <code>any deepClone(original: any)</code>  ——深拷贝（真正意义上的深拷贝，可以弥补用JSON.parse和JSON.stringify来拷贝的局限性）

---

> <code>function debounce(fn: function, wait: number, immediate?: boolean)</code>  ——防抖函数，返回一个经过封装后的函数；
>> wait：设置防抖的时间周期，如果下一次触发离上一次触发的时间小于时间周期，那么上一次触发的函数不会执行；也就是说，存在N * wait 时间内只会执行一次函数的情况：函数每次触发都离上一次触发的时间小于wait。

>> immediate：可选，是否在第一次触发时执行函数。（默认为false，即延迟到最后一次触发后的wait时间后执行函数）

---

> <code>function throttle(func: function, wait: number)</code>  ——节流函数，返回一个经过封装后的函数；
>>> wait：设置节流的时间周期，在这个周期内触发多次事件时，一定会执行一次。
