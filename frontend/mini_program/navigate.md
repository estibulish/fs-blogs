# 小程序跳转

## 页面跳转

### uni.navigateTo

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。

**OBJECT参数说明**

| 参数              | 类型     | 必填 | 默认值 | 说明                                                         | 平台差异说明 |
| :---------------- | :------- | :--- | :----- | :----------------------------------------------------------- | :----------- |
| url               | String   | 是   |        | 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数 |              |
| animationType     | String   | 否   | pop-in | 窗口显示的动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router.html#animation) | App          |
| animationDuration | Number   | 否   | 300    | 窗口动画持续时间，单位为 ms                                  | App          |
| events            | Object   | 否   |        | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。 |              |
| success           | Function | 否   |        | 接口调用成功的回调函数                                       |              |
| fail              | Function | 否   |        | 接口调用失败的回调函数                                       |              |
| complete          | Function | 否   |        | 接口调用结束的回调函数（调用成功、失败都会执行）             |              |

**object.success 回调函数**

**参数**

**Object res**

| 属性         | 类型                                                         | 说明                 |
| :----------- | :----------------------------------------------------------- | :------------------- |
| eventChannel | [EventChannel](https://uniapp.dcloud.net.cn/api/router.html#event-channel) | 和被打开页面进行通信 |

**示例**

```javascript
//在起始页面跳转到test.vue页面并传递参数
uni.navigateTo({
	url: 'test?id=1&name=uniapp'
});
```

```javascript
// 在test.vue页面接受参数
export default {
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option.id); //打印出上个页面传递的参数。
		console.log(option.name); //打印出上个页面传递的参数。
	}
}
```

```js
// 在起始页面跳转到test.vue页面，并监听test.vue发送过来的事件数据
uni.navigateTo({
  url: '/pages/test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'data from starter page' })
  }
})

// 在test.vue页面，向起始页通过事件传递数据
onLoad: function(option) {
  const eventChannel = this.getOpenerEventChannel();
  eventChannel.emit('acceptDataFromOpenedPage', {data: 'data from test page'});
  eventChannel.emit('someEvent', {data: 'data from test page for someEvent'});
  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
  eventChannel.on('acceptDataFromOpenerPage', function(data) {
    console.log(data)
  })
}
```

vue3 `script setup` 语法糖中调用 `getOpenerEventChannel` 示例：

```js
<script setup>
  import {
    onMounted,
    getCurrentInstance
  } from 'vue';

  onMounted(() => {
    const instance = getCurrentInstance().proxy
    const eventChannel = instance.getOpenerEventChannel();
    
    eventChannel.emit('acceptDataFromOpenedPage', {
      data: 'data from test page'
    });
    
    eventChannel.emit('someEvent', {
      data: 'data from test page for someEvent'
    });
    
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log('acceptDataFromOpenerPage', data)
    })
  })
</script>
```

url有长度限制，太长的字符串会传递失败，可改用[窗体通信](https://uniapp.dcloud.io/collocation/frame/communication)、[全局变量](https://ask.dcloud.net.cn/article/35021)，另外参数中出现空格等特殊字符时需要对参数进行编码，如下为使用`encodeURIComponent`对参数进行编码的示例。

```html
<navigator :url="'/pages/test/test?item='+ encodeURIComponent(JSON.stringify(item))"></navigator>
```

```javascript
// 在test.vue页面接受参数
onLoad: function (option) {
	const item = JSON.parse(decodeURIComponent(option.item));
}
```

**注意：**

- 页面跳转路径有层级限制，不能无限制跳转新页面
- 跳转到 tabBar 页面只能使用 switchTab 跳转
- 路由API的目标页面必须是在pages.json里注册的vue页面。如果想打开web url，在App平台可以使用 [plus.runtime.openURL](http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL)或web-view组件；H5平台使用 window.open；小程序平台使用web-view组件（url需在小程序的联网白名单中）。在hello uni-app中有个组件ulink.vue已对多端进行封装，可参考。

### uni.redirectTo

关闭当前页面，跳转到应用内的某个页面。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| url      | String   | 是   | 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2' |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**示例**

```javascript
uni.redirectTo({
	url: 'test?id=1'
});
```

复制代码

**注意：**

- 跳转到 tabBar 页面只能使用 switchTab 跳转

### uni.reLaunch

关闭所有页面，打开到应用内的某个页面。

**注意：** 如果调用了 [uni.preloadPage(OBJECT)](https://uniapp.dcloud.net.cn/api/preload-page) 不会关闭，仅触发生命周期 `onHide`

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| url      | String   | 是   | 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数 |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**示例**

```javascript
uni.reLaunch({
	url: 'test?id=1'
});
```

复制代码

```javascript
export default {
	onLoad: function (option) {
		console.log(option.id);
	}
}
```

复制代码

Tips：

- H5端调用`uni.reLaunch`之后之前页面栈会销毁，但是无法清空浏览器之前的历史记录，此时`navigateBack`不能返回，如果存在历史记录的话点击浏览器的返回按钮或者调用`history.back()`仍然可以导航到浏览器的其他历史记录。

### uni.switchTab

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。

**注意：** 如果调用了 [uni.preloadPage(OBJECT)](https://uniapp.dcloud.net.cn/api/preload-page) 不会关闭，仅触发生命周期 `onHide`

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| url      | String   | 是   | 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数 |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**示例**

pages.json

```javascript
{
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    },{
      "pagePath": "pages/other/other",
      "text": "其他"
    }]
  }
}
```

复制代码

other.vue

```javascript
uni.switchTab({
	url: '/pages/index/index'
});
```

### uni.navigateBack

关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层。

**OBJECT参数说明**

| 参数              | 类型     | 必填 | 默认值  | 说明                                                         | 平台差异说明 |
| :---------------- | :------- | :--- | :------ | :----------------------------------------------------------- | :----------- |
| delta             | Number   | 否   | 1       | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。      |              |
| animationType     | String   | 否   | pop-out | 窗口关闭的动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router.html#animation) | App          |
| animationDuration | Number   | 否   | 300     | 窗口关闭动画的持续时间，单位为 ms                            | App          |
| success           | Function | 否   |         | 接口调用成功的回调函数                                       |              |
| fail              | Function | 否   |         | 接口调用失败的回调函数                                       |              |
| complete          | Function | 否   |         | 接口调用结束的回调函数（调用成功、失败都会执行）             |              |

**示例**

```javascript
// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

// 此处是A页面
uni.navigateTo({
	url: 'B?id=1'
});

// 此处是B页面
uni.navigateTo({
	url: 'C?id=1'
});

// 在C页面内 navigateBack，将返回A页面
uni.navigateBack({
	delta: 2
});
```

### EventChannel

2.8.9+ 支持 页面间事件通信通道

**方法**

#### EventChannel.emit(string eventName, any args)

触发一个事件

string eventName 事件名称

any args 事件参数

#### EventChannel.off(string eventName, function fn)

取消监听一个事件。给出第二个参数时，只取消给出的监听函数，否则取消所有监听函数

string eventName 事件名称

function fn 事件监听函数

参数 any args 触发事件参数

#### EventChannel.on(string eventName, function fn)

持续监听一个事件

string eventName 事件名称

function fn 事件监听函数

参数 any args 触发事件参数

#### EventChannel.once(string eventName, function fn)

监听一个事件一次，触发后失效

string eventName 事件名称

function fn 事件监听函数

参数 any args 触发事件参数

Tips：

- `navigateTo`, `redirectTo` 只能打开非 tabBar 页面。
- `switchTab` 只能打开 `tabBar` 页面。
- `reLaunch` 可以打开任意页面。
- 页面底部的 `tabBar` 由页面决定，即只要是定义为 `tabBar` 的页面，底部都有 `tabBar`。
- 不能在首页 `onReady` 之前进行页面跳转。
- H5端页面刷新之后页面栈会消失，此时`navigateBack`不能返回，如果一定要返回可以使用`history.back()`导航到浏览器的其他历史记录。

**参考事项**

- 页面路由拦截和管理，插件市场有很多封装好的工具类，搜索[路由](https://ext.dcloud.net.cn/search?q=路由)

## 跳转小程序

### uni.navigateToMiniProgram

打开另一个小程序。

**平台差异说明**

|   App   |  H5  | [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/navigate/wx.navigateToMiniProgram.html) | [支付宝小程序](https://docs.alipay.com/mini/api/open-miniprogram) | [百度小程序](https://smartprogram.baidu.com/docs/develop/api/open_smartprogram/#swan-navigateToSmartProgram/) | [抖音小程序](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/open-interface/mini-app-forward/tt-navigate-to-mini-program/) | [QQ小程序](https://q.qq.com/wiki/develop/miniprogram/API/open_port/port_change.html#qq-navigatetominiprogram) | 京东小程序 |
| :-----: | :--: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--------: |
| x(见下) |  x   |                              √                               |                              √                               |                              √                               |                          √(1.15.0+)                          |                              √                               |     √      |

- App平台打开微信小程序，使用plus.share的[launchMiniProgram](https://www.html5plus.org/doc/zh_cn/share.html#plus.share.ShareService.launchMiniProgram)。注意uni-app不需要plus ready，将plus ready里的代码写到页面的onLoad生命周期即可。使用此功能需在manifest中配置微信分享SDK信息，打包后生效。
- 各小程序平台对跳转到其他小程序有一些限制和规定，需要遵守，具体见各平台文档。

**OBJECT 参数说明**

| 属性       | 类型     | 默认值  | 必填 | 说明                                                         | 平台差异说明                         |
| :--------- | :------- | :------ | :--- | :----------------------------------------------------------- | :----------------------------------- |
| appId      | string   |         | 是   | 要打开的小程序 appId（百度小程序则填写App Key）              |                                      |
| path       | string   |         | 否   | 打开的页面路径，如果为空则打开首页                           |                                      |
| extraData  | object   |         | 否   | 需要传递给目标小程序的数据，目标小程序可在 `App.vue` 的 `onLaunch`或`onShow` 中获取到这份数据。 |                                      |
| envVersion | string   | release | 否   | 要打开的小程序版本，有效值： develop（开发版），trial（体验版），release（正式版）。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。 | 支付宝小程序、微信小程序、抖音小程序 |
| success    | function |         | 否   | 接口调用成功的回调函数                                       |                                      |
| fail       | function |         | 否   | 接口调用失败的回调函数                                       |                                      |
| complete   | function |         | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                      |

**示例代码**

```js
uni.navigateToMiniProgram({
  appId: '',
  path: 'pages/index/index?id=123',
  extraData: {
    'data1': 'test'
  },
  success(res) {
    // 打开成功
  }
})
```

### uni.navigateBackMiniProgram(OBJECT)

跳转回上一个小程序，只有当另一个小程序跳转到当前小程序时才会能调用成功。

**平台差异说明**

| App  |  H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 抖音小程序 | 飞书小程序 | QQ小程序 | 快手小程序 | 京东小程序 |
| :--: | :--: | :--------: | :----------: | :--------: | :--------: | :--------: | :------: | :--------: | :--------: |
|  x   |  x   |     √      |      √       |     √      |     √      |     x      |    √     |     √      |     √      |

**OBJECT参数说明**

| 属性      | 类型     | 必填 | 说明                                                         |
| :-------- | :------- | :--- | :----------------------------------------------------------- |
| extraData | Object   | 否   | 需要返回给上一个小程序的数据，上一个小程序可在 `App.vue` 的 `onShow` 中获取到这份数据 |
| success   | function | 否   | 接口调用成功的回调函数                                       |
| fail      | function | 否   | 接口调用失败的回调函数                                       |
| complete  | function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**示例代码**

```js
uni.navigateBackMiniProgram({
  extraData: {
    'data1': 'test'
  },
  success(res) {
    // 返回成功
  }
})
```

复制代码

### uni.openEmbeddedMiniProgram(OBJECT)

微信小程序跳转小程序（半屏模式）（从微信础库 2.20.1 开始支持）

当小程序需要打开另一个小程序让用户进行快捷操作时，可将要打开的小程序以半屏的形态跳转。

![img](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/wx-miniprogram.jpeg)

**调用流程**

1. 微信小程序2.23.1以下版本基础库，开发者需要在全局配置`manifest.json`-->`mp-weixin`节点下添加`embeddedAppIdList`字段并声明需要半屏跳转的小程序，若不配置将切换为普通的小程序跳转小程序。2.23.1及以上版本起无需配置。

配置示例：

```js
	{
		"mp-weixin" : {
		   "embeddedAppIdList": ["wxe5f52902cf4de896"]//需要半屏跳转的小程序appid
		}
	}
```

1. 开发者通过调用uni.openEmbeddedMiniProgram半屏跳转小程序：

| 属性       | 类型     | 默认值  | 必填 | 说明                                                         |
| ---------- | -------- | ------- | ---- | ------------------------------------------------------------ |
| appId      | string   |         | 是   | 要打开的小程序 appId                                         |
| path       | string   |         | 否   | 打开的页面路径，如果为空则打开首页。path 中 ? 后面的部分会成为 query，在小程序的`App.vue` 的 `onLaunch`、`onShow`和 Page.onLoad 的回调函数中可以获取到 query 数据。对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"。[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html) |
| extraData  | object   |         | 否   | 需要传递给目标小程序的数据，目标小程序可在 `App.vue` 的 `onLaunch`或`onShow` 中获取到这份数据。[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html) |
| envVersion | string   | release | 否   | 要打开的小程序版本，有效值： develop（开发版），trial（体验版），release（正式版）。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。 |
| shortLink  | string   |         | 否   | 小程序链接，当传递该参数后，可以不传 appId 和 path。链接可以通过【小程序菜单】->【复制链接】获取。 |
| success    | function |         | 否   | 接口调用成功的回调函数                                       |
| fail       | function |         | 否   | 接口调用失败的回调函数                                       |
| complete   | function |         | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**示例代码**

```js
uni.openEmbeddedMiniProgram({
	appId: '',
	path: 'pages/index/index?id=123',
	extraData: {
		'data1': 'test'
	},
	success(res) {
    // 打开成功
	}
})
```

**使用限制**

2022年3月18日后，使用过程有以下限制，若不符合以下所有条件将被自动切换为普通的小程序跳转小程序，不影响用户使用：

1. 被半屏跳转的小程序需要通过来源小程序的调用申请，开发者可在 小程序管理后台「设置」-「第三方设置」-「半屏小程序管理」板块发起申请，最多可以申请10个小程序；
2. 微信小程序2.23.1版本以下基础库，被半屏打开的小程序需要在全局配置`manifest.json`-->`mp-weixin`节点下添加`embeddedAppIdList`字段并声明；
3. 当前小程序需为竖屏；
4. 被半屏跳转的小程序需为非个人主体小程序（不含小游戏）

2022年3月18日前，使用过程有以下限制，若不符合以下所有条件将被自动切换为普通的小程序跳转小程序，不影响用户使用：

1. 不能在横屏下打开半屏小程序
2. 能打开小游戏
3. 跳转目标小程序需符合以下类目，[详见小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html)

## app跳小程序

1、调用plus.share.getServices获取微信分享服务对象

```js
//获取终端支持的分享通道列表
plus.share.getServices(function(s) {
		let sweixin = null;
		for (let i = 0; i < s.length; i++) {
			if (s[i].id == 'weixin') {
				sweixin = s[i];
			}
		}
	}, function(e) {
		console.log("微信唤起失败", e);
		return false;
	});
```

2、跳转

```js
//判断是否有微信
if (sweixin) {
    console.log('调起小程序', s)
    //唤起微信跳转小程序
    sweixin.launchMiniProgram({
        id: '小程序原始id', // 以gh_开头
        path: '小程序页面路由',
        type: 0, // LAUNCH_TYPE 0是正式环境  1测试版 2是体验版本
    }, function(res) {
        console.log("返回app", res);
        return true;
    }, function(e) {
        console.log("微信唤起失败", e);
        uni.showToast({
            title: e.message.indexOf('微信未安装') != -1 ? '请先安装微信应用后再尝试' : '未知错误',
            icon: 'none'
        })
        options.fail && options.fail(e)
        return false;
    })
} else {
    uni.showToast({
        title: '请先安装微信应用后再尝试',
        icon: 'none',
        duration: 3000
    })
    return false;
}
```

## 网页跳小程序

获取签名，配置按钮

```js
methods: {
    // 获取签名，配置按钮
    wxmini() {
        //openWxmini是调用接口来获取签名等等，都是后端生成的（参数一般都有url也就是页面路径）
        this.openWxmini({ Url: location.href }).then((config) => {
            console.log(config, 'res');
            wx.config({
                debug: false,
                appId: config.appId,
                timestamp: config.timestamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: ['chooseImage', 'uploadImage', 'getLocation', 'openLocation'],
                openTagList: ["wx-open-launch-weapp"]
            })
            //配置成功之后的函数，按钮生成成功
            wx.ready(() => {
                console.log("ready");
            });
            wx.error(function (res) {
                console.log(res, 'error');
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
            });

        });
    },
    async openWxmini() {
        let params = {
            city: this.city,
            url: window.location.href.split("#")[0],
            type: 'bj',
        }

        let config = await request({
            url: api.getWechatJsByUrl,
            method: 'GET',
            params,
        })
        config.signature = config.jsSignature;
        return config;
    }
}
```

页面标签

```vue
/*
* path: 小程页面路径，需带上.html
*/
<template>
	<div ref="launchBtnHome" class="launchBtnHome" style="width: 100%; position: fixed; bottom: 45px">
        <wx-open-launch-weapp id="launch-btn" username="gh_c047d654ee27"
            path="/pages/pcoupon/receive.html?id=1ece4d9b-be0d-4deb-bcc7-bfacb95abb5b&type=136">
            <script type="text/wxtag-template">
                <style>
                    .button {
                        width: 275px;
                        height: 43px;
                        margin: 40px auto 0;
                        background: linear-gradient(-1deg, #fda63d, #fbf4ca);
                        box-shadow: 0px 2px 3px 0px rgba(158, 87, 0, 0.36);
                        border-radius: 21px;
                        border: none;
                        line-height: 43px;
                        font-size: 21px;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                    }
                </style>
                <button class="button">进入小程序</button>
            </script>
        </wx-open-launch-weapp>
    </div>
</template>

```

效果

![/8d4bf3086e419940d8a457f034fd606.png](/8d4bf3086e419940d8a457f034fd606.png)

![/5d842b5a843f2c47dafcbce3fbe4b50.jpg](/5d842b5a843f2c47dafcbce3fbe4b50.jpg)

## 小程序 scheme

### 功能描述

- 该接口用于获取小程序 scheme 码，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景。目前仅针对国内非个人主体的小程序开放，详见[获取 URL scheme](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html)。

### 注意事项

#### 调用上限

- 生成端：每天生成 URL Scheme（加密 明文） 和 URL Link 的总数量上限为50万
- 打开端：每天通过 URL Scheme（加密 明文） 和 URL Link 打开小程序的总次数上限为300万
- **自 2023 年 12 月 19 日起，取消 URL Scheme 一人一链的限制，支持同一条连接被多名用户访问。详细调整说明可见[《URL Scheme 和 URL Link优化公告》](https://developers.weixin.qq.com/community/develop/doc/00024e32cbc36055c0c0a34b066401)。**

### 其他注意事项

- **加密 URL Scheme 支持开发者自行在链接后面拼接 query 参数，详见[获取 URL Scheme](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html)**
- 微信内的网页如需打开小程序请使用微信开放标签-小程序跳转按钮，无公众号也可以直接使用小程序身份开发网页并免鉴权跳转小程序，见云开发静态网站跳转小程序。符合开放范围的小程序可以下发支持打开小程序的短信
- 该功能基本覆盖当前用户正在使用的微信版本，开发者无需进行低版本兼容
- 只能生成已发布的小程序的 URL Scheme
- 通过 URL Scheme 跳转到微信时，可能会触发系统弹框询问，若用户选择不跳转，则无法打开小程序。请开发者妥善处理用户选择不跳转的场景
- 部分浏览器会限制打开网页直接跳转，可参考示例网页设置跳转按钮

## 调用方式

### HTTPS 调用

```text
POST https://api.weixin.qq.com/wxa/generatescheme?access_token=ACCESS_TOKEN
```

# 获取 URL Scheme

自 2023 年 12 月 19 日起，对URL Scheme进行升级，详细调整说明可见[《URL Scheme 和 URL Link优化公告》](https://developers.weixin.qq.com/community/develop/doc/00024e32cbc36055c0c0a34b066401)。改动点概览如下：

**1. 支持开发者在原有加密 URL Scheme 后面拼接参数**；

**2. 新增明文 URL Scheme，开发者无需调用接口可自行拼接生成明文Scheme**；

**3. 取消 URL Scheme 一人一链的限制，支持同一条连接被多名用户访问**；

**4. 每个小程序每天 URL Scheme 和 URL Link 总打开次数上限为300万**。

## 加密 URL Scheme

### 获取方式

通过[服务端接口](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-scheme/urlscheme.generate.html)可以获取打开小程序任意页面的加密 URL Scheme。适用于从短信、邮件、微信外网页等场景打开小程序。 通过 URL Scheme 打开小程序的场景值为 1065。
生成的 URL Scheme 如下所示：

```text
weixin://dl/business/?t= *TICKET*
```

iOS系统支持识别 URL Scheme，可在短信等应用场景中直接通过Scheme跳转小程序。
Android系统不支持直接识别 URL Scheme，用户无法通过 Scheme 正常打开小程序，开发者需要使用 H5 页面中转，再跳转到 Scheme 实现打开小程序，跳转代码示例如下：

```text
location.href = 'weixin://dl/business/?t= *TICKET*'
```

该跳转方法可以在用户打开 H5 时立即调用，也可以在用户触发事件后调用。

### 拼接参数

将原有 URL Scheme 平滑升级为加密 URL Scheme，支持开发者自行在链接后面拼接参数`CUSTOM PARAMETE`,拼接参数后的 URL Scheme 如下所示：

```text
weixin://dl/business/?t= *TICKET*?cq=*CUSTOM PARAMETER*
```

注意：

1. `CUSTOM PARAMETE`是一种特殊的`query`，最大256个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~%`，需要url_encode;
2. 在本次规则调整生效前已经生成的 URL Scheme 可继续正常使用，并可直接进行`CUSTOM PARAMETE`参数拼接；
3. 拼接参数后的加密 URL Scheme 打开小程序的场景值不变，仍为 1065。

## 明文 URL Scheme

### 获取方式

开发者无需调用平台接口，在[MP平台->设置->隐私与安全->明文Scheme拉起此小程序](https://mp.weixin.qq.com/wxamp/basicprofile/index?token=2058489984&lang=zh_CN)声明后，可自行根据如下格式拼接appid和path等参数，作为明文 URL Scheme 链接。

```text
weixin://dl/business/?appid=*APPID*&path=*PATH*&query=*QUERY*&env_version=*ENV_VERSION*
```

其中，各个参数的定义如下：

1. 【必填】APPID：通过明文 URL Scheme 打开小程序的 appid ；
2. 【必填】PATH：通过明文 URL Scheme 打开小程序的页面 path ，必须是已经发布的小程序存在的页面，不可携带 query；
3. 【选填】QUERY：通过明文 URL Scheme 打开小程序的 query ，最大512个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~%`，需要url_encode；
4. 【选填】ENV_VERSION：要打开的小程序版本,正式版为`release`，体验版为`trial`，开发版为`develop`，仅在微信外打开时生效。注意：若不填写，则默认打开正式版小程序。

通过明文 URL Scheme 打开小程序的场景值为 1286。

## 频率限制

生成端：每天生成 URL Scheme（加密+明文） 和 URL Link 的总数量上限为50万；

**打开端：每天通过 URL Scheme（加密+明文） 和 URL Link 打开小程序的总次数上限为300万。**

## 注意事项

1. 微信内的网页如需打开小程序请使用[微信开放标签-小程序跳转按钮](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#开放标签说明文档)，无公众号也可以直接使用小程序身份开发网页并免鉴权跳转小程序，见[云开发静态网站跳转小程序](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/staticstorage/jump-miniprogram.html)。符合开放范围的小程序可以[下发支持打开小程序的短信](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/staticstorage/msg-miniprogram.html)
2. 该功能基本覆盖当前用户正在使用的微信版本，开发者无需进行低版本兼容
3. 只能生成已发布的小程序的 URL Scheme
4. 通过 URL Scheme 跳转到微信时，可能会触发系统弹框询问，若用户选择不跳转，则无法打开小程序。请开发者妥善处理用户选择不跳转的场景
5. 部分浏览器会限制打开网页直接跳转，可参考示例网页设置跳转按钮
6. 平台有安全策略防止开发者的链接被黑灰产批量打开，导致的达到访问上限无法正常打开小程序的问题

## 开放范围

针对非个人主体小程序开放。