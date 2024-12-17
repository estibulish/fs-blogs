# 工具函数

![https://img.jbzj.com/file_images/article/202110/20211015142842760.png?2021915142853](https://img.jbzj.com/file_images/article/202110/20211015142842760.png?2021915142853)

## 数字操作

### 1、数字千分位分隔

```js
function separator(n){
    let num = n.toString();
    let len = num.length;
    if (len <= 3) {
        return num;
    } else {
        let temp = '';
        let remainder = len % 3;
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
        } else { // 3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp; 
        }
    }
}
```

## **数组操作**

### 1、数组乱序

```js
function arrScrambling(arr) { 
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}
```

### 2、数组扁平化

```js
function flatten (arr) {
    let result = [];
  
    for(let i = 0; i < arr.length; i++) {
        const data = arr[i];
      if(Array.isArray(data)) {
        result = result.concat(flatten(data));
      } else if (Object.prototype.toString.call(data) === '[object Object]') {
        for (const key in data) {
            if (Object.hasOwnProperty.call(arr[i], key)) {
                if (Array.isArray(data[key])) {
                    data[key] = result.concat(flatten(data[key]));

                }
            }
        }
        result.push(arr[i]);
      } else {
        result.push(arr[i]);
      }
    }
    return result;
}

```

### 3、数组中获取随机数

```js
function sample (arr) {
	return arr[Math.floor(Math.random() * arr.length)];
} 


```

### 4、字符串操作

```js
function randomString (len) {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    let strLen = chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * strLen));
    }
    return randomStr;
};

```

### 5、字符串首字母大写

```js
function fistLetterUpper (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
```

### 6、手机号中间四位变成*

```js
function telFormat(tel) {
   tel = String(tel); 
   return tel.substr(0,3) + "****" + tel.substr(7);
};
```

### 7、驼峰命名转换成短横线命名

```js
function getKebabCase(str) {
    return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}
```

### 8、短横线命名转换成驼峰命名

```js
function getCamelCase(str) {
    return str.replace( /-([a-z])/g, (i, item) => item.toUpperCase())
}
```

## 格式转化

### 1、数字转化为大写金额

```js
function digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    } 
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
```

### 2、数字转化为中文数字

```js
function intToChinese(value) {
 const str = String(value);
 const len = str.length-1;
 const idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
 const num = ['零','一','二','三','四','五','六','七','八','九'];
 return str.replace(/([1-9]|0+)/g, ( $, $1, idx, full) => {
    let pos = 0;
    if($1[0] !== '0'){
      pos = len-idx;
      if(idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
        return idxs[len-idx];
      }
      return num[$1[0]] + idxs[len-idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if(Math.floor(right / 4) - Math.floor(left / 4) > 0){
        pos = left - left % 4;
      }
      if( pos ){
        return idxs[pos] + num[$1[0]];
      } else if( idx + $1.length >= len ){
        return '';
      }else {
        return num[$1[0]]
      }
    }
   });
}
```

## 操作存储

### 1、存储loalStorage

```js
function setStorage(key, value) {
    if (!key) return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};
```

### 2、获取loalStorage

```js
function getStorage(key) {
    if (!key) return '';
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
};
```

### 3、删除localStorage

```js
function removeStorage(key) {
    if (!key) return;
    window.localStorage.removeItem(key);
};
```

### 4、存储sessionStorage

```js
function setSession(key, value) {
   if (!key) return;
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, value)
};
```

### 5、获取sessionStorage

```js
function getSession(key) {
   if (!key) return;
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : value;
};
```

### 6、删除sessionStorage

```js
function removeSession(key) {
   if (!key) return;
    window.sessionStorage.removeItem(key)
};
```

## 操作cookie

### 1、设置cookie

```js
function setCookie(key, value, expire) {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};
```

### 2、读取cookie

```js
function getCookie(key){
    const cookieStr = unescape(document.cookie);
       const arr = cookieStr.split('; ');
       let cookieValue = '';
       for (let i = 0; i < arr.length; i++) {
           const temp = arr[i].split('=');
           if (temp[0] === key) {
               cookieValue = temp[1];
               break
       }
    }
    return cookieValue
};
```

### 3、删除cookie

```js
function delCookie(key) {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};
```

## 格式校验

### 1、校验身份证号码

```js
function checkCardNo(value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
};
```

### 2、校验是否包含中文

```js
function haveCNChars(value) {
    return /[\u4e00-\u9fa5]/.test(value);
}
```

### 3、校验是否为中国大陆的邮政编码

```js
function isPostCode(value) {
    return /^[1-9][0-9]{5}$/.test(value.toString());
}
```

### 4、校验是否为IPv6地址

```js
function isIPv6(str) {
    return Boolean(str.match(/:/g)?str.match(/:/g).length<=7:false && /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str):/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}
```

### 5、校验是否为邮箱地址

```js
function isEmail(value) {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
}
```

### 6、校验是否为中国大陆手机号

```js
function isTel(value) {
    return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}
```

### 7、校验是否包含emoji表情

```js
function isEmojiCharacter(value) {
   value = String(value);
    for (let i = 0; i < value.length; i++) {
        const hs = value.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (value.length > 1) {
                const ls = value.charCodeAt(i + 1);
                const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (value.length > 1) {
            const ls = value.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                return true;
            }
        }
    }
   return false;
}
```

## 操作URL

### 1、获取URL参数列表

```js
function getQueryVariable(url, attribute) {
    if (!url) return '';
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
    let paramsObj = {};
    for (let i = 0; i < paramsArr.length; i++) {
        const param = paramsArr[i];
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('='); // 分割 key 和 value
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
            if (key === attribute) return val;
            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = val;
            }
        } else { // 处理没有 value 的参数
            
            paramsObj[param] = true;
        }
    }
    if(attribute) return '';
    return paramsObj;
};
```

### 2、检测URL是否有效

```js
function getUrlState(URL) {
  let xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    let result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}


```

### 3、键值对拼接成URL参数

```js
function params2Url(obj) {
     let params = []
     for (let key in obj) {
       params.push(`${key}=${obj[key]}`);
     }
     return encodeURIComponent(params.join('&'))
}
```

### 4、修改URL中的参数

```js
function replaceParamVal(paramName, replaceWith) {
   const oUrl = location.href.toString();
   const re = eval('/('+ paramName+'=)([^&]*)/gi');
   location.href = oUrl.replace(re,paramName+'='+replaceWith);
   return location.href;
}
```

### 5、删除URL中指定参数

```js
function funcUrlDel(name) {
    const baseUrl = location.origin + location.pathname + "?";
    const query = location.search.substr(1);
    if (query.indexOf(name) > -1) {
        const obj = {};
        const arr = query.split("&");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    }
}
```

## 设备判断

### 1、判断是移动还是PC设备

```js
function isMobile() {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
  return 'mobile';
  }
  return 'desktop';
}
```

### 2、判断是否是苹果还是安卓移动设备

```js
function isAppleMobileDevice() {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
}
```

### 3、判断是否是安卓移动设备

```js
function isAndroidMobileDevice() {
  return /android/i.test(navigator.userAgent.toLowerCase());
}
```

### 4、判断是Windows还是Mac系统

```js
function osType() {
    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
   const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
    if (isWindows) {
        return "windows";
    }
    if(isMac){
        return "mac";
    }
}
```

### 5、判断是否是微信/QQ内置浏览器

```js
function broswer() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "weixin";
    } else if (ua.match(/QQ/i) == "qq") {
        return "QQ";
    }
    return false;
}
```

### 6、浏览器型号和版本

```js
function getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}
```

## 浏览器操作

### 1、滚动到页面顶部

```js
function scrollToTop() {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
}
```

### 2、滚动到页面底部

```js
function scrollToBottom() {
  window.scrollTo(0, document.documentElement.clientHeight);  
}
```

### 3、滚动到指定元素区域

```js
function smoothScroll(element) {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
};
```

### 4、获取可视窗口高度

```js
function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}
```

### 5、获取可视窗口宽度

```js
function getPageViewWidth() {
    return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}
```

### 6、打开浏览器全屏

```js
function toFullScreen() {
    let element = document.body;
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
}
```

### 7、退出浏览器全屏

```js
function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
}
```

### 8、浏览器是否全屏

```js
function isFullscreen() {
	return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || false;
}
```

## 时间操作

### 1、当前时间

```js
function format(n) {
	return n < 10 ? '0' + n : n;
}

function nowTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = format(now.getMonth()+1);
    const date = format(now.getDate());
    const hour = format(now.getHours());
    const miu = format(now.getMinutes());
    const sec = format(now.getSeconds());
    return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
}
```

### 2、格式化时间

```js
function format(n) {
	return n < 10 ? '0' + n : n;
}

function dateFormater(time, formater) {
    let date = time ? new Date(time) : new Date(),
        Y = date.getFullYear() + '',
        M = format(date.getMonth()+1),
        D = format(date.getDate()),
        H = format(date.getHours()),
        m = format(date.getMinutes()),
        s = format(date.getSeconds());
    return formater.replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substr(2, 2))
        .replace(/MM/g,(M<10 ? '0' : '') + M)
        .replace(/DD/g,(D<10 ? '0' : '') + D)
        .replace(/HH|hh/g,(H<10 ? '0' : '') + H)
        .replace(/mm/g,(m<10 ? '0' : '') + m)
        .replace(/ss/g,(s<10 ? '0' : '') + s)
}
// dateFormater('YYYY-MM-DD HH:mm:ss')
// dateFormater('YYYYMMDDHHmmss')
```

##  JavaScript操作

### 1、阻止冒泡事件

```js
function stopPropagation(e) { 
    e = e || window.event; 
    if(e.stopPropagation) {    // W3C阻止冒泡方法 
        e.stopPropagation(); 
    } else { 
        e.cancelBubble = true; // IE阻止冒泡方法 
    } 
}
```

### 2、防抖函数

防抖通过设置setTimeout定时器的方式延迟执行，当快速多次点击的时候，每一次都会重置定时器，只有你一段时间都不点击时定时器才能到达条件并执行事件函数。即**如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。**

```js
//防抖函数
function debounce(fn,delay){
    //设置time为定时器
    var time = null;
    //闭包原理，返回一个函数
    return function (e){
        //如果定时器存在则清空定时器
        if(time){
            clearTimeout(time);
        }
        //设置定时器，规定时间后执行真实要执行的函数
        time = setTimeout(() => {//此箭头函数里的this指向btn这个按钮
            fn.call(this,arguments);//改变真实要执行函数的this指向，原submit函数里面的this指向window
        },delay);
    }
}
```

### 3、节流函数

节流其实就很好理解了，减少一段时间的触发频率。简单来说，就是你一直狂点不停的话，它会每隔一定时间就执行一次。它与防抖最大的区别就是，无论事件触发多么频繁，都可以保证在**规定时间内可以执行一次执行函数**

```js
function throttle(fn,interval = 0) {
    var _self = fn; // 保存需要延迟执行函数的引用
    var timer = null;
    var firstTime = true; // 是否第一次调用

    return function() {
        var args = arguments;
        var _me = this;
        // 第一次不需要延迟
        if (firstTime) {
            _self.apply(_me,args)
            return firstTime = false;
        }
        // 定时器还在，说明延迟执行还没完成
        if (timer) {
            return false;
        }

        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null;
            _self.apply(_me,args)
        }, interval);
    }
}
```

### 4、数据类型判断

```js
function getDataType(value) {
  if (value === null) {
    return value + "";
  }
  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}


```

### 5、对象深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date){
   return new Date(obj);
  } 
  //正则对象直接返回一个新的正则对象     
  if (obj instanceof RegExp){
   return new RegExp(obj);     
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)){
   return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) { 
    if(typeof obj[key] === 'object' && obj[key] !== null){
     cloneObj[key] = deepClone(obj[key], hash);
    } else {
     cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}

```

### 6、转义html标签

```js
function htmlEncode(text) {
	return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
```

### 7、跨浏览器绑定事件

```js
function addEvent(element, event, fn) {
	if(!element) return;
	if(element.addEventListener) {
		element.addEventListener(event, fn, false)
	} else if(element.attachEvent) { // 兼容IE
		element.attachEvent('on' + event, fn)
	} else {
		element['on' + event] = fn;
	}
}
```

### 8、加入收藏夹

```js
function addFavorite(sUrl, sTitle) {
	try {
		window.external.addFavorite(sUrl, sTitle)
	} catch(e) {
		try {
            window.sidebar.addPanel(sTitle, sUrl, '')
        } catch(e) {
			alert('收入收藏夹失败，请使用Ctrl + D进行添加')
        }
	}
}
```

### 9、动态添加脚本

```js
function importScript(url, loadSuccess, loadError) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (loadSuccess && typeof loadSuccess === 'function') {
        script.onload = fOnload;
    }
    if (loadError && typeof loadError === 'function') {
        script.onerror = loadError;
    }
    head.appendChild(script);
}
```

### 10、Base64 和 File、Blob 相互转换

**Base64 转 File**

```js
function base64ToFile(base64, mime, filename) {
  let arr = base64.split(',')
  let type = mime || arr[0].match(/:(.*?);/)[1]
  let suffix = mine.split('/')[1]
  let fileName = filename || `未命名.${suffix}`
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type })
}

```

**File 转 Base64**

```js
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
```

**Base64 转 Blob**

```js
function base64ToBlob(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

```

**Blob 转 Base64**

```js
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
}

```

**Blob 和 File 相互转换**

```js
const file = new File([/* data */], "filename.txt", { type: "text/plain" });
const blob = new Blob([file]);

const blob = new Blob([/* data */], { type: "text/plain" });
const file = new File([blob], "filename.txt", { type: blob.type, lastModified: Date.now() });

```

### 11、Base64 编码和解码

**Base64 编码**

```js
// btoa() 相当于 window.btoa(),encodeURIComponent 同理
const str = 'test'
const encode = btoa(encodeURIComponent(str))
console.log(encode)	// dGVzdA==
```

**Base64 解码**

```js
// atob() 相当于 window.atob(),decodeURIComponent 同理
const str = 'dGVzdA=='
const decode = decodeURIComponent(atob(str))
console.log(decode)	// test
```

**中文乱码处理方法**

```js
const Base64 = {
    encode(str) {
        // 首先，我们使用 encodeURIComponent 来获得百分比编码的UTF-8，然后我们将百分比编码转换为原始字节，最后存储到btoa里面
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode(Number('0x' + p1));
            }));
    },
    decode(str) {
        // 过程：从字节流到百分比编码，再到原始字符串
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
}
let encoded = Base64.encode("一颗不甘坠落的流星"); 	// "5LiA6aKX5LiN55SY5Z2g6JC955qE5rWB5pif"
let decoded = Base64.decode(encoded); 				// "一颗不甘坠落的流星"

```

### 11、版本号对比

```js
function equalVersion(curV,reqV){

    var arr1=curV.split('.');
    var arr2=reqV.split('.');
    
    if(arr1.length !== arr2.length) return {
        equal: 0,
        pos: 0,
    }
    //将两个版本号拆成数字
    var minL= Math.min(arr1.length,arr2.length);
    var pos=0;        //当前比较位
    var diff=0;        //当前为位比较是否相等

    //逐个比较如果当前位相等则继续比较下一位
    while(pos<minL){
        diff=parseInt(arr1[pos])-parseInt(arr2[pos]);
        if(diff!=0){
          break;
        }
        pos++;
    }

    if (diff>0) {
        console.log('新版本')
    }else if (diff==0) {
        console.log('稳定版')
    }else{
        console.log('旧版本')
    }
    return {
        equal: diff==0,
        pos: pos, // 差异位置决定更新方式
    }
}
```

### 12、精度计算

```js
class PrecisionCalculator {
    constructor(num) {
        this.value = num;
        this.result = num;
    }

    // 私有方法，用于获取数字的小数位数
    #getDecimalDigits(num) {
        return (num.toString().split('.')[1] || "").length;
    }

    // 私有方法，用于根据两个数字的小数位数计算放大倍数（base）
    #calculateBase(num1, num2) {
        return Math.pow(10, Math.max(this.#getDecimalDigits(num1), this.#getDecimalDigits(num2)));
    }

    add(num) {
        const base = this.#calculateBase(this.result, num);
        this.result = (this.result * base + num * base) / base;
        return this;
    }

    subtract(num) {
        const base = this.#calculateBase(this.result, num);
        this.result = (this.result * base - num * base) / base;
        return this;
    }

    multiply(num) {
        const base = this.#calculateBase(this.result, num);
        this.result = (this.result * num * base) / base;
        return this;
    }

    divide(num) {
        if (num === 0) {
            throw new Error("除数不能为0");
        }
        const base1 = Math.pow(10, this.#getDecimalDigits(this.result));
        const base2 = Math.pow(10, this.#getDecimalDigits(num));
        this.result = (this.result * base2) / (num * base1);
        return this;
    }

    getValue() {
        return this.result;
    }
}

// 使用示例
const result = new PrecisionCalculator(0.1)
   .add(0.2)
   .subtract(0.05)
   .multiply(2)
   .divide(0.5)
   .getValue();

console.log(result);

```

