# 前端发版后浏览器缓存问题

### 一、简介

- 开发完发布新版本后，在有些电脑上总需要强刷才能获取到最新版本的内容，太恶心了。
- 浏览器缓存（Browser Caching）是为了节约网络的资源加速浏览，浏览器在用户磁盘上对最近请求过的文档进行存储，当访问者再次请求这个页面时，浏览器就可以从本地磁盘显示文档，这样就可以加速页面的阅览。

- 附：前端缓存详解，看了这篇更容易理解缓存配置的概念，浏览器缓存主要有两类：协商缓存 和 彻底(强)缓存。


例如：program、cache-control 和 expires 都是前端缓存的关键字段，优先级是 `pragma` > `cache-control `> `expires`，pragma 是旧产物，已经逐步抛弃，有些网站为了向下兼容还保留了这个字段。

### 二、解决方案

##### 1、在 `.html` 页面加 `meta` 标签

```html
<meta http-equiv="pragram" content="no-cache">
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="expires" content="0">
```

##### 2、后端 `nginx` 配置，让 `index.html` 不缓存

`vue` 默认配置，打包后 `css` 和 `js` 的名字后面都加了哈希值，不会有缓存问题，但是 `index.html` 在服务器端可能是有缓存的，需要在服务器配置不让缓存 `index.html`。

```nginx
location = /index.html {
  add_header Cache-Control "no-cache, no-store";
}
```

##### 3、使用 `Vue` 脚手架的情况下：`vue.config.js`

```js
// 动态版本号
const version = new Date().getTime()
// 配置
module.exports = {
  devServer: {},
  filenameHashing: false, // 打包的时候不使用 hash 值，因为后面自行添加时间戳或者版本号了
  css: {
    // 是否使用 css 分离插件 ExtractTextPlugin
    extract: {
      // 输出编译后的文件名称：【文件名称.时间戳】、【文件名称.版本号.时间戳】...
      filename: `css/[name].${version}.css`,   
      chunkFilename: `css/[name].${version}.css`
      // filename: `css/[name].${process.env.VUE_APP_VERSION}.${version}.css`,   
      // chunkFilename: `css/[name].${process.env.VUE_APP_VERSION}.${version}.css`
    }
  },
  configureWebpack: {
    output: { // 输出编译后的文件名称：【文件名称.时间戳】、【文件名称.版本号.时间戳】...
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
      // filename: `js/[name].${process.env.VUE_APP_VERSION}.${version}.js`,
      // chunkFilename: `js/[name].${process.env.VUE_APP_VERSION}.${version}.js`
    }
  }
}

```

##### 4、使用 `webpack` 的情况下：`webpack.config.js`

```javascript
const date = new Date()
const version = moment(date).format('YYYYMMDDHHmmssSSS') // 打包时候的版本号
const timestamp = date.getTime() // 时间戳
// 注意需下面这段放到配置导出中
output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name].[chunkhash:8].${ version }.js?_t=${ timestamp }`),
    chunkFilename: utils.assetsPath(`js/[name].[chunkhash:8].${ version }.js?_t=${ timestamp }`)
}
```

##### 5、有新版本发布，及时拉取最新版本代码

有时候发布了新版本，用户不刷新或强制刷新，一直不能看不到最新版本代码，则封装了套在切换页面时检查服务器是否有新版本，有新版本则直接强制刷新拉取最新版本代码，这样也解决了缓存问题，切换页面就能及时同步到最新版本代码，使用也简单，导入之后两步小操作就能支持。

支持 vue、react、原生 ... 项目使用。

version.js 下载地址，下载后导入项目任意工具文件夹即可。

vue 项目导入方式：在 src 文件夹中使用可以 const version = require('@/utils/version') 这样引入使用，在根目录也就是 src 之外的文件夹则只能 const version = require('./src/utils/version') 这样引入使用。

使用方式，只需要 两个位置导入使用 即可：
