# 发布-订阅模式

## 实现

```js
class EventBus {
  constructor() {
    // 缓存列表，用来存放注册的事件与回调
    this.cache = {};
  }
 
  // 订阅事件
  on(name, cb) {
    // 如果当前事件没有订阅过，就给事件创建一个队列
    if (!this.cache[name]) {
      this.cache[name] = []; //由于一个事件可能注册多个回调函数，所以使用数组来存储事件队列
    }
    this.cache[name].push(cb); 
  }
 
  // 触发事件
  emit(name, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.cache[name]) {
      // 逐个调用队列里的回调函数
      this.cache[name].forEach((callback) => {
        callback(...args);
      });
    }
  }
 
  // 取消订阅
  off(name, cb) {
    const callbacks = this.cache[name]; 
    const index = callbacks.indexOf(cb); 
    if (index !== -1) {
      callbacks.splice(index, 1); 
    }
  }
 
  // 只订阅一次
  once(name, cb) {
    // 执行完第一次回调函数后，自动删除当前订阅事件
    const fn = (...args) => {
      cb(...args); 
      this.off(name, fn); 
    };
    this.on(name, fn);
  }
}
 
// 测试
let eventBus = new EventBus();
let event1 = function (...args) {
  console.log(`通知1-订阅者小陈老师,小明同学当前心情状态：${args}`)
};
// 订阅事件，只订阅一次
eventBus.once("teacherName1", event1);
// 发布事件
eventBus.emit("teacherName1", "教室", "上课", "打架", "愤怒");
eventBus.emit("teacherName1", "教室", "上课", "打架", "愤怒");
eventBus.emit("teacherName1", "教室", "上课", "打架", "愤怒");
```