# Notification浏览器通知

## 

```js
function notifyMe() {
  if (!("Notification" in window)) {
    // 检查浏览器是否支持通知
    alert("当前浏览器不支持桌面通知");
  } else if (Notification.permission === "granted") {
    // 检查是否已授予通知权限；如果是的话，创建一个通知
    const notification = new Notification("你好！");
    // …
  } else if (Notification.permission !== "denied") {
    // 我们需要征求用户的许可
    Notification.requestPermission().then((permission) => {
      // 如果用户接受，我们就创建一个通知
      if (permission === "granted") {
        const notification = new Notification("你好！");
        // …
      }
    });
  }

  // 最后，如果用户拒绝了通知，并且你想尊重用户的选择，则无需再打扰他们
}

```