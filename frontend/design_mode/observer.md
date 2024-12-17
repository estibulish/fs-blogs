# 观察者模式

## 实现

```js
// 被观察者 学生
class Subject {
  constructor() {
    this.state = "happy";
    this.observers = []; // 存储所有的观察者
  }
  //新增观察者
  add(o) {
    this.observers.push(o);
  }
  //获取状态
  getState() {
    return this.state;
  }
  // 更新状态并通知
  setState(newState) {
    this.state = newState;
    this.notify();
  }
  //通知所有的观察者
  notify() {
    this.observers.forEach((o) => o.update(this));
  }
}
 
// 观察者 父母和老师
class Observer {
  constructor(name) {
    this.name = name;
  }
  //更新
  update(student) {
    console.log(`亲爱的${this.name} 通知您当前学生的状态是${student.getState()}`);
  }
}
 
let student = new Subject();
let parent = new Observer("父母");
let teacher = new Observer("老师");
//添加观察者
student.add(parent);
student.add(teacher);
//设置被观察者的状态
student.setState("刚刚好");

```

![https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a6efe3e379447c39ce57903f5b6539d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=444&h=154&s=8916&e=png&b=fefefe](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a6efe3e379447c39ce57903f5b6539d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=444&h=154&s=8916&e=png&b=fefefe)



