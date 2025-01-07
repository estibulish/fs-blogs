# 关于WebSocket前端必知必会的知识点

## 什么是WebSocket

WebSocket是一种网络传输协议，可以在单个TCP连接上进行全双工通信，位于OSI模型的应用层。
WebSocket使得客户端和服务器之间的数据交换变得更加简单，服务器可以主动向客户端发送消息。在WebSocket API中，浏览器和服务器只需要完成一个握手，就可以建立持久性的连接，并进行双向数据传输。

## WebSocket之前的方式

在WebSocket之前，浏览器（客户端）和服务器之间进行实时通信有以下几种方式：

- 短轮询（short polling）：

  - 浏览器每隔一段时间（比如每秒）就向服务器发送HTTP网络请求，服务器再把最新的数据返回给浏览器

  - 这种方式的缺点在于浏览器需要不断地向服务器发送网络请求，而每次HTTP请求头和响应头中携带的信息可能是一样的，真正有用的数据只有一小部分，这样会消耗很多带宽资源

- 
  长轮询（long polling）：

  - 同样是浏览器每隔一段时间就向服务器发送HTTP网络去获取最新数据，区别在于服务器在接收到网络请求之后不会立即将最新数据返回给客户端，而是在数据发生变化或者达到一定的响应时间限制之后才将请求结果返回给客户端，从而减少了客户端请求的次数
  - 这种方式的缺点在于服务器在将客户端请求挂起的时候，同样存在资源消耗



这些方式都不是很好的方式，在这种情况下，HTML5定义了WebSocket协议，它能更好地节省服务器资源和带宽，并且能够更实时地进行通信



## WebSocket的优点

- 较少的控制开销：在建立连接之后，服务器和客户端之间交换数据时，用于协议控制的数据包头部相对较小
- 更强的实时性：由于协议是全双工的，因此服务器可以随时主动地向客户端传递消息。相比于HTTP请求需要等待客户端发送请求之后服务器才能响应，延迟明显更少。相比于长轮询，WebSocket能够更频繁地传递数据
- 保持连接状态：由于WebSocket建立连接之后，除非一方主动断开，否则这个连接会一直保持，因此在之后的通信过程中，就可以省略部分状态信息。（相比于HTTP每次请求都是独立的）
- 更好的二进制支持：WebSocket定义了二进制帧，相对HTTP，可以更轻松地处理二进制内容
- 可以支持协议拓展：用户可以自定义子协议
- 更好的压缩效果：相对于HTTP压缩，Websocket在适当的扩展支持下，可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率



## WebSocket连接的建立过程

WebSocket 是独立的、建立在TCP上的协议。它建立连接的过程（handshake）如下：

- 首先建立TCP连接
- 在建立TCP连接之后，浏览器会先通过HTTP请求来告知服务器进行协议升级，具体的做法是在带上一些特殊的请求头：

![![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56cffe7db3141e48e5d2b43e9b3726f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=777&h=371&s=35033&e=png&b=fefefe)](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56cffe7db3141e48e5d2b43e9b3726f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=777&h=371&s=35033&e=png&b=fefefe)

其其中`Connection: Upgrade`用于告知服务器进行协议升级，`Upgrade: websocket`用于告知想要升级的协议是Websocket，`Set-Websocket-Key`是一段随机生成的base64码，用于服务器返回响应结果时验证

- 服务器如果支持升级成WebSocket协议，就会在响应结果中指示浏览器切换协议，具体做法如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe00a4e264164c10b2b5c21d634dff35~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=702&h=240&s=21359&e=png&b=fefefe)

- 根据客户端传递过来的`Set-Websocket-Key`用某个公开的算法变成另外一个字符串，放在HTTP响应的`Sec-Websocket-Accept`响应头中
- 将响应状态码设置为`101`
- 此时，浏览器收到服务器的响应结果之后，会同样使用公开算法将之前发送的`Set-Websocket-Key`转成另外一个字符串，与服务器返回的`Sec-Websocket-Accept`进行比较，如果一致的话就验证通过
- 至此握手完成，WebSocket连接建立，之后就可以使用WebSocket进行通信了



## 服务器代码的实现

我们可以使用Node.js编写一个简单的WebSocket服务器，代码如下：

```js
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 3003 }, () => {
  console.log("websocket服务在3003端口开启了");
});

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log("接收到了客户端的消息", data.toString());
    socket.send("resp" + data.toString());
  });
});
```

## **客户端代码的实现**

对于客户端（浏览器）的代码，我们可以直接使用`WebSocket` API进行编写：

```js
<div>
  <input type="text" class="message">
  <button class="send-btn">发送消息</button>
</div>
<script>
  const ws = new WebSocket('ws://localhost:3003')
  ws.addEventListener('open', (e) => {
    console.log('websocket连接已建立', e);
  })
  ws.addEventListener('message', (e) => {
    console.log('接收到的消息内容', e.data);
  })
  ws.addEventListener('close', (e) => {
    console.log('websocket连接关闭了', e);
  })
  ws.onerror = (e) => {
    console.log('websocket连接出错', e);
  }

  const messageEl = document.querySelector('.message')
  const sendBtnEl = document.querySelector('.send-btn')
  sendBtnEl.addEventListener('click', () => {
    ws.send(messageEl.value)
  })
</script>

```

注意到`WebSocket`继承自`EventTarget`接口，因此我们可以使用`addEvenListener`的方式对`WebSocket`实例进行事件监听，从而对`WebSocket`实例的`open`、`message`、`close`、`error`事件进行监听处理，它们的触发时机如下：

- `open`：在WebSocket连接建立之后触发，此时可以使用WebSocket进行通信了
- `message`：在建立WebSocket连接之后，接收到服务器发送过来的消息时触发
- `close`：在WebSocket连接关闭的时候触发
- `error`：在WebSocket连接出错的时候触发

在浏览器与服务器建立WebSocket连接之后，我们可以在浏览器控制台中查看具体发送和接收到的消息：![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7c9caf91d6640c1b13fb5f7e49dee0c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1259&h=490&s=70445&e=png&b=fefefe)

# 心跳机制的加入

在上面，我们实现了一个简单的WebSocket通信案例，但是在实际使用中，我们还需要考虑以下几种异常情况：

1. 如果服务器因为某种异常情况而突然断开了WebSocket服务，之后又恢复了，此时的浏览器会断开WebSocket连接并触发`close`事件，从用户使用角度来说应该要能够自动重新连接WebSocket服务器
2. 如果客户端因为某种异常情况而断开了WebSocket连接（比如断网了），之后用恢复了，我们同样希望能够自动重新连接WebSocket服务器

针对上面的问题，我们可以采用以下的方案：

- 监听浏览器WebSocket的`close`、`error`事件，一旦出现就尝试重新连接WebSocket服务器
- 设置一个心跳包机制，一旦停止心跳，说明此时通信出现异常，也要进行重连尝试

对于心跳包的实现，存在两种方式：

- 方式一：客户端发送心跳包（ping），服务器需要响应心跳包消息（pong）来表明通信正常，客户端一旦没有接收到响应消息就进行重连尝试。这种方式的优点在于客户端可以灵活控制心跳包的发送频率，缺点则在于需要ping、pong两次消息传递，比较消耗带宽
- 方式二：由服务器来发送心跳包，客户端如果过期没有接收到，就进行重连尝试。这种方式的优点在于只需要服务器发送心跳包就可以了，缺点是客户端无法灵活控制心跳包的发送频率，只能在服务器进行设置

这里，我们来对方式一进行实现： 首先，我们要知道在什么时候开始发送心跳包？

- 在WebSocket连接建立的时候，因此我们可以通过监听`open`事件来开始发送心跳包。

那么要如何进行一次心跳检测呢？

- 我们需要使用定时器，每隔一段时间就发送一次ping消息，并且在ping消息发送之后，我们还需要设置一个定时器用来检测是否接收到了pong消息或者普通消息
- 如果及时接收到了pong消息或者普通消息，说明此时WebSocket通信正常，我们需要将之前设置的定时器（ping消息发送定时器和pong消息检测定时器）都清除掉。并执行下一次心跳检测
- 如果没有及时收到pong消息或者普通消息，说明此时的WebSocket通信异常，需要进行`reconnect`重连尝试

对于重连操作，由于浏览器原生的WebSocket API并没有提供`reconnect`操作，因此，我们需要自己实现它。具体的做法为：重新创建一个`WebSocket`实例，并重新添加用户自定义的事件监听

完整的代码实现如下：

```js
class WebSocketHeartbeat {
  constructor(url) {
    this.url = url;
    this.pingTimeout = 10000; // 心跳消息的发送间隔
    this.pongTimeout = 1000; // pong消息允许的最大延时
    this.pingTimeoutId = null; // 用于发送心跳消息的延时器
    this.pongTimeoutId = null; // 用于检测服务器是否及时返回pong消息的延时器
    this.isReconnecting = false; // 用于记录当前是否处于重连的状态
    this.reconnectTimeout = 1000; // 尝试重连的时间间隔
    this.isForbiddenReconnect = false; // 用于标记是否要尝试重连
    this.onopen = () => {};
    this.onclose = () => {};
    this.onmessage = () => {};
    this.onerror = () => {};
    this.createWebSocket();
  }
  // 创建一个websocket实例
  createWebSocket() {
    this.ws = new WebSocket(this.url);
    this.init();
  }
  // 添加事件监听
  init() {
    this.ws.onopen = (e) => this.handleOpen(e);
    this.ws.onclose = (e) => this.handleClose(e);
    this.ws.onerror = (e) => this.handleError(e);
    this.ws.onmessage = (e) => this.handleMessage(e);
  }
  handleOpen(e) {
    console.log("websocket连接已建立", e);
    this.onopen(e);
    // 开始进行心跳检测
    this.checkHeartbeat();
  }
  handleMessage(e) {
    console.log("接收到的消息内容", e.data);
    this.onmessage(e);
    // 收到消息后，再次进行心跳检测
    this.checkHeartbeat();
  }
  handleClose(e) {
    console.log("websocket连接关闭了", e);
    this.onclose(e);
    // 尝试重连操作
    this.reconnect();
  }
  handleError(e) {
    console.log("websocket连接出错", e);
    this.onerror(e);
    this.reconnect();
  }
  send(data) {
    this.ws.send(data);
  }
  // 用于用户主动断开连接
  close() {
    this.ws.close();
    this.resetHeartbeat();
    this.isForbiddenReconnect = true;
  }
  // 原生的WebSocket并没有提供reconnect APi，
  // 因此我们此处reconnect实际上做的操作是重新创建一个WebSocket实例
  reconnect() {
    console.log("进行重连~");
    // 在重新创建连接的时候应该确保一次只创建一个，并且不要频繁创建
    if (this.isReconnecting || this.isForbiddenReconnect) return;
    this.isReconnecting = true;
    setTimeout(() => {
      this.createWebSocket();
      this.isReconnecting = false;
    }, this.reconnectTimeout);
  }
  checkHeartbeat() {
    this.resetHeartbeat();
    this.tryHeartbeat();
  }
  resetHeartbeat() {
    clearTimeout(this.pingTimeoutId);
    clearTimeout(this.pongTimeoutId);
  }
  tryHeartbeat() {
    this.pingTimeoutId = setTimeout(() => {
      this.send("heartbeat");
      // 如果超过一定时间（约定的pong返回时间）还没有接收到消息，此时需要进行重连操作
      this.pongTimeoutId = setTimeout(() => {
        console.log("需要进行重连操作");
        this.reconnect();
      }, this.pongTimeout);
    }, this.pingTimeout);
  }
}

export { WebSocketHeartbeat };

// 心跳消息（ping）的发送时机：
// 首先是发送间隔，这个应该是可以设置的
// 在建立websocket连接之后就开始尝试发送一次心跳消息
// 服务端会返回pong消息或者其它消息给客户端，此时再次尝试发送一次心跳消息

```

用户的使用案例：

```js
import { WebSocketHeartbeat } from './websocket-heartbeat.js'
const ws = new WebSocketHeartbeat('ws://localhost:3003')
ws.onmessage = ({ data }) => {
  console.log('用户处理消息', data);
}

const messageEl = document.querySelector('.message')
const sendBtnEl = document.querySelector('.send-btn')
const closeBtnEl = document.querySelector('.close-btn')
sendBtnEl.addEventListener('click', () => {
  ws.send(messageEl.value)
})
closeBtnEl.addEventListener('click', () => {
  ws.close()
})

```

