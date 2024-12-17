# VUE项目配置SSR

技术标签： [vue](https://codeleading.com/tag/vue/) [vue](https://codeleading.com/tag/vue/)

具体可参考官方文档：[Vue.js 服务器端渲染指南 | Vue SSR 指南 (vuejs.org)](https://v2.ssr.vuejs.org/zh/)

## 1、修改路由配置

```javascript
// router/index.js
 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'

const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 
Vue.use(VueRouter)
 
// 工厂函数 每次请求返回一个Router实例
export function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About', 
    component: () => import('../views/AboutView.vue')
  }
]
```

 ## 修改vuex配置

```javascript
// store/index.js
 
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)

function fetchData(params) {
  return new Promise(resolve => {
    resolve({id:1 ,name: "张三丰"})
  })
}
 
//createStore
export function createStore() {
  return new Vuex.Store({
    state: {
      count: 99,
      user: {}
    },
    mutations: {
      add(state){ 
        state.count += 1
      },
      setData(state, data) {
        state.user = data
      }
    },
    actions: {
      fetchData({commit}, id) {
        return fetchData().then(res => {
          console.log(res,'res');
          commit('setData', res)
        })
      }
    },
    modules: {

    }
  })
}
```

## 修改main.js

```javascript
// main.js
 
import Vue from 'vue'
import App from './App.vue'
 
//引用createRouter，createStore 
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
 
Vue.config.productionTip = false
 
// 需要每次请求 放回一个vue实例(不用挂载app)
export function createApp(context) {
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store,router)()

  const app = new Vue({
    router,
    store, // 挂载
    context, // 用于和外的renderer交互
    render: h => h(App)
  })
 
  return {app, router, store}
}
```

## 在src录下创建服务端入口（entry-server.js）

```javascript
// src/entry-server.js
// 和渲染器打交道
// 创建vue实例
import { createApp } from './main'

export default context => {
    const { app, router, store } = createApp(context)

    return new Promise((resolve, reject) => {
        // 跳转首屏地址
        router.push(context.url)

        // 等待路由就绪 等到 router 将可能的异步组件和钩子函数解析完
        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state

                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
```

## 在src目录下创建客户端入口文件entry-client.js

```javascript
// src/entry-client.js

import { createApp } from './main'
import Vue from 'vue'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
    beforeMount() {
        const { asyncData } = this.$options
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    }
})

router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {

            // 停止加载指示器(loading indicator)

            next()
        }).catch(next)
    })
    app.$mount('#app')
})
```

## webpack配置

> npm install webpack-node-externals lodash.merge -D
>
> npm i vue vue-server-renderer -S // 必须和vue保持同一版本

 7、在项目根目录下创建vue.config.js并配置

```javascript
const { defineConfig } = require('@vue/cli-service')

// 两个插件分别负责打包客户端和服务端
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");

// 根据传入环境变量决定入口文件和相应配置项
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    // extract: false
  },
  outputDir: './dist/' + target,
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    // target设置为node使webpack以Node适用的方式处理动态导入，
    // 并且还会在编译Vue组件时告知`vue-loader`输出面向服务器代码。
    target: TARGET_NODE ? "node" : "web",
    // 是否模拟node全局变量
    node: TARGET_NODE ? undefined : false,
    output: {
      // 此处使用Node风格导出模块
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的打包文件。
    externals: TARGET_NODE
      ? nodeExternals({
        // 不要外置化webpack需要处理的依赖模块。
        // 可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 还应该将修改`global`（例如polyfill）的依赖模块列入白名单
        allowlist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: undefined
    },
    // 这是将服务器的整个输出构建为单个 JSON 文件的插件。
    // 服务端默认文件名为 `vue-ssr-server-bundle.json`
    // 客户端默认文件名为 `vue-ssr-client-manifest.json`。
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    // cli4项目添加
    if (TARGET_NODE) {
      // 代码分割
      // config.optimization.delete('splitChunks')
    }

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
})

```

## 脚本配置安装依赖

> npm i cross-env -D

## 修改package.json配置

> "scripts": {
> "serve": "vue-cli-service serve",
> "build": "npm run build:server & npm run build:client",
> "build:client": "vue-cli-service build",
> "build:server": "cross-env WEBPACK_TARGET=node vue-cli-service build"
> },

## 修改public目录下的index.html 

```javascript
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="favicon.ico">
    <title>{{title}}</title>
  </head>
  <body>
    <div id="app">
      <!--vue-ssr-outlet-->
    </div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

## 新增服务器启动文件 （根目录创建文件 server/ssr.js）

```javascript
// 创建一个express实例
const express = require('express')

const app = express()

// 获取绝对地址
const resolve = dir => require('path').resolve(__dirname, dir)

// 静态文件服务
// 开发dist/client目录，关闭默认的index页面打开功能
app.use(express.static(resolve('../dist/client'), { index: false }))

// 创建渲染器
const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync(resolve("../public/index.html"), 'utf-8')  // 宿主文件
const serverBundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve("../dist/client/vue-ssr-client-manifest.json"))  // 客户端清单

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template,
    clientManifest,
})


// 只做一个件事，渲染
app.get('*', async (req, res) => {

    try {
        const context = {
            title: 'vue ssr',
            url: req.url
        }
        // 渲染: 得到html字符串
        const html = await renderer.renderToString(context)
        // 发送回前端
        res.send(html)
    } catch (error) {
        if (error.code === 404) {
            res.status(500).send('Page not found')

        } else {
            res.status(500).send('Internal Server Error')
        }
    }

})

// 监听端口
app.listen(3000, () => console.log('服务器开启'))
```

## 打包文件

```
npm run build 
```

//会创建一个dist文件目录，名下包括client和server两个文件件

## 启动服务器node

```
node ./server/ssr.js 
```

[ ](https://blog.csdn.net/weixin_44314609/article/details/120717065)14、注意事项

- 1、vue与vue-server-renderer版本一致
- 2、报错：Error: [webpack-node-externals] : Option 'whitelist' is not supported. Did you mean 'allowlist'  //修改vue.config.js（whitelist 改成 allowlist）
- 3、在beforeCreate，created除外的生命周期以及全局的执行环境中调用特定的api前需要**判断执行环境**
- 4、每次修改需要重新打包，重启服务器

