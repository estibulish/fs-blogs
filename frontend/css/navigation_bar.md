# 屏幕安全区域

### css方式

```css
获取上安全距离(安全区域距离顶部边界的距离)：
env(safe-area-inset-top)

获取左安全距离(安全区域距离左边边界的距离)：
env(safe-area-inset-left)

获取右安全距离(安全区域距离右边边界的距离)：
env(safe-area-inset-right)

获取下安全距离(安全距离底部边界的距离)：
env(safe-area-inset-bottom)
```

使用方式

```css
padding-bottom: constant(safe-area-inset-bottom);/*兼容 IOS<11.2*/
padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
```

`注意`：env()和constant()需要同时存在，且顺序不能调换