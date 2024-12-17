# 浏览器数据库 IndexedDB 入门教程

## 一、概述
随着浏览器的功能不断增强，越来越多的网站开始考虑，将大量数据储存在客户端，这样可以减少从服务器获取数据，直接从本地获取数据。

现有的浏览器数据储存方案，都不适合储存大量数据：Cookie 的大小不超过4KB，且每次请求都会发送回服务器；LocalStorage 在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。所以，需要一种新的解决方案，这就是 IndexedDB 诞生的背景。

![img](https://www.wangbase.com/blogimg/asset/201807/bg2018070401.png)

通俗地说，IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。

IndexedDB 具有以下特点。

**（1）键值对储存。** IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

**（2）异步。** IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。

**（3）支持事务。** IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

**（4）同源限制** IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

（5）储存空间大 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

**（6）支持二进制储存。** IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

## 二、基本概念
**IndexedDB** 是一个比较复杂的 API，涉及不少概念。它把不同的实体，抽象成一个个对象接口。学习这个 API，就是学习它的各种对象接口。

```js
数据库：IDBDatabase 对象
对象仓库：IDBObjectStore 对象
索引： IDBIndex 对象
事务： IDBTransaction 对象
操作请求：IDBRequest 对象
指针： IDBCursor 对象
主键集合：IDBKeyRange 对象
```

下面是一些主要的概念。

### （1）数据库

数据库是一系列相关数据的容器。每个域名（严格的说，是协议 + 域名 + 端口）都可以新建任意多个数据库。

IndexedDB 数据库有版本的概念。同一个时刻，只能有一个版本的数据库存在。如果要修改数据库结构（新增或删除表、索引或者主键），只能通过升级数据库版本完成。

### （2）对象仓库

每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格。

### （3）数据记录

对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。主键用来建立默认的索引，必须是不同的，否则会报错。主键可以是数据记录里面的一个属性，也可以指定为一个递增的整数编号。

```js
{ id: 1, text: 'foo' }
```


上面的对象中，id属性可以当作主键。

数据体可以是任意数据类型，不限于对象。

### （4）索引

为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引。

### （5）事务

数据记录的读写和删改，都要通过事务完成。事务对象提供error、abort和complete三个事件，用来监听操作结果。

## 三、操作流程

IndexedDB 数据库的各种操作，一般是按照下面的流程进行的。这个部分只给出简单的代码示例，用于快速上手，详细的各个对象的 API 请看这里。

### 3.1 打开数据库

使用 IndexedDB 的第一步是打开数据库，使用`indexedDB.open()`方法。

```js
var request = window.indexedDB.open(databaseName, version);
```


这个方法接受两个参数，第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库。第二个参数是整数，表示数据库的版本。如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为1。

`indexedDB.open()`方法返回一个 `IDBRequest` 对象。这个对象通过三种事件`error`、`success`、`upgradeneeded`，处理打开数据库的操作结果。

**（1）error 事件**

error事件表示打开数据库失败。

```js
request.onerror = function (event) {
  console.log('数据库打开报错');
};
```

**（2）success 事件**

success事件表示成功打开数据库。

```js
var db;

request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};
```

这时，通过request对象的result属性拿到数据库对象。

**（3）upgradeneeded 事件**

如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件`upgradeneeded`。

```js
var db;

request.onupgradeneeded = function (event) {
  db = event.target.result;
}
```

这时通过事件对象的`target.result`属性，拿到数据库实例。

### 3.2 新建数据库

新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在`upgradeneeded`事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。

通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。

```js
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
}
```


上面代码中，数据库新建成功以后，新增一张叫做`person`的表格，主键是id。

更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。

```js
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
}
```


主键（key）是默认建立索引的属性。比如，数据记录是`{ id: 1, name: '张三' }`，那么id属性可以作为主键。主键也可以指定为下一层对象的属性，比如`{ foo: { bar: 'baz' } }`的foo.bar也可以指定为主键。

如果数据记录里面没有合适作为主键的属性，那么可以让 `IndexedDB` 自动生成主键。

```js
var objectStore = db.createObjectStore(
  'person',
  { autoIncrement: true }
);
```


上面代码中，指定主键为一个递增的整数。

新建对象仓库以后，下一步可以新建索引。

```js
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
}
```


上面代码中，`IDBObject.createIndex()`的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。

### 3.3 新增数据

新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。

```js
function add() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

add();
```

上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（"只读"或"读写"）。新建事务以后，通过`IDBTransaction.objectStore(name)`方法，拿到 `IDBObjectStore` 对象，再通过表格对象的add()方法，向表格写入一条记录。

写入操作是一个异步操作，通过监听连接对象的`success`事件和`error`事件，了解是否写入成功。

### 3.4 读取数据

读取数据也是通过事务完成。

```js
function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
   var request = objectStore.get(1);

   request.onerror = function(event) {
     console.log('事务失败');
   };

   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}

read();
```

上面代码中，`objectStore.get()`方法用于读取数据，参数是主键的值。

### 3.5 遍历数据

遍历数据表格的所有记录，要使用指针对象 `IDBCursor`。

```js
function readAll() {
  var objectStore = db.transaction('person').objectStore('person');

   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;

 if (cursor) {
   console.log('Id: ' + cursor.key);
   console.log('Name: ' + cursor.value.name);
   console.log('Age: ' + cursor.value.age);
   console.log('Email: ' + cursor.value.email);
   cursor.continue();
} else {
  console.log('没有更多数据了！');
}

  };
}

readAll();
```

上面代码中，新建指针对象的`openCursor()`方法是一个异步操作，所以要监听`success`事件。

### 3.6 更新数据

更新数据要使用`IDBObject.put()`方法。

```js
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

update();
```

上面代码中，`put()`方法自动更新了主键为`1`的记录。

### 3.7 删除数据

`IDBObjectStore.delete()`方法用于删除记录。

```js
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

remove();
```

### 3.8 使用索引

索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

假定新建表格的时候，对`name`字段建立了索引。

```js
objectStore.createIndex('name', 'name', { unique: false });
```


现在，就可以从`name`找到对应的数据记录了。

```js
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```

### 3.9 索引升级与数据升级的问题

在增删索引时需要先得到对应的objectStore，而要得到objectStore必须先有事务，但是onupgradeneeded 时 你不能创建事务，这似乎是一个矛盾！
其实onupgradeneeded 时已经自带了一个 versionchange的事务，这是一个作用域覆盖了所有objectStores的事务，像这样就可以操作数据了：

```js
openDBRequest.onupgradeneeded = (e) => {
    objectStore = openDBRequest.transaction.objectStore('myObjectStore')   
    objectStore.createIndex('index_name', ['field1', 'field2', 'field3'], { unique: true })
}
```

有些时候我们必须要在onupgradeneeded 中操作数据，已便在升级数据库的同时，升级转换已经存在了的数据！上面解决拿到objectStore的问题（操作数据必须拿到objectStore），但确实不应该在onupgradeneeded中操作数据，当你成功完成了onupgradeneeded 数据库升级后，会触发 onsuccess回调，你应该在这里面操作数据！

### 3.10 删除数据库

```js
/**
 * 删除数据库
 * @param {object} dbName 数据库名称
 */
function deleteDBAll(dbName) {
  console.log(dbName);
  let deleteRequest = window.indexedDB.deleteDatabase(dbName);
  deleteRequest.onerror = function (event) {
    console.log("删除失败");
  };
  deleteRequest.onsuccess = function (event) {
    console.log("删除成功");
  };
}

```

### 3.11 关闭数据库

当我们数据库操作完毕后，建议关闭它，节约资源。

```js
/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
function closeDB(db) {
  db.close();
  console.log("数据库已关闭");
}

```

### 3.12 数据库升级面临的多窗口问题

用户可能打开了多个浏览器标签或窗口，这时所有页面链接的都是旧版的indexDB。如果用户刷新了某一个页面，从而下载了最新的代码，就会在这个页面触发数据库的升级，这时升级就会出现问题 —— 好在我们在其他页面，可以监听到数据库在请求升级，也可以主动断开链接，你可以这样：

```js
openReq.onsuccess = e => {
    console.log('db open success!')
    db = openReq.result
    db.onversionchange=e=>{
        db.close()  // 关闭连接
        console.log("页面内容已过期，请刷新");
    }
}
```

当数据库已经升级，但页面没有刷新而使用老代码在打开低版本的数据库时，这时会触发VersionError错误，你可以监听这个错误，并提示用户刷新页面！

未经用户同意就直接关闭数据库的链接，可能会给用户带来不好的体验，如果不这么做，就要像下面这样给出提示：

```js
openReq.onblocked = function(event) {  
  console.log("请先关闭其他页面，再加载本页面！");
};
```

## 示例代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TODO APP</title>
    <style>
        .add,
        .view {
            padding: 30px;
            width: 40%;
        }

        .add {
            background: #ebe6e6;
        }

        section {
            padding: 10px;
            background: #3182d4;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }

        h1 {
            margin: 0;
        }

        ol {
            list-style-type: none;
        }

        div {
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <section>
        <aside class="view">
            <h2>TODOs<button id="getData" onclick="getIndexDBdData()">获取数据</button></h2>
            <div class="todos">
                <ol></ol>
            </div>
        </aside>
        <aside class="add">
            <h2>添加 Todo</h2>
            <form>
                <div>
                    <label for="name">姓名：</label>
                    <input id="name" type="text" required />
                </div>
                <div>
                    <label for="email">邮箱</label>
                    <input id="email" type="text" required />
                </div>
                <div>
                    <button id="save">保存</button>
                </div>
            </form>
        </aside>
    </section>
    <script>
        const todos = document.querySelector('ol');
        const form = document.querySelector('form');
        const todoTitle = document.querySelector('#name');
        const todoDesc = document.querySelector('#email');
        const submit = document.querySelector('#save');
        const getBtn = document.querySelector('#getData');
        var db;
        //  兼容浏览器
        var indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
        var request = indexedDB.open('person', 9);
        request.onsuccess = function (event) {
            db = request.result;
            console.log('数据打开成功', db);
        }
        request.onerror = function (event) {
            console.log('数据库打开失败');
        }
        request.onupgradeneeded = function (event) {
            db = event.target.result;
            console.log('执行', db);
            var objectStore;
            // 新建数据库
            if (!db.objectStoreNames.contains('person')) {
                // 自动生成主键 autoIncrement
                objectStore = db.createObjectStore('person', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('email', 'email', { unique: false });
            } else {
                objectStore = request.transaction.objectStore('person') 
                if(db.version == 8)  {
                    objectStore.createIndex('age', 'age', { unique: false })
                } else if (db.version == 9) {
                    objectStore.deleteIndex('email')
                }
            }
            // else {
            //     const transaction = db.transaction(['person'], 'readwrite');
            //     const objectStore = transaction.objectStore('person');
            //     console.log('创阿金');
            //     objectStore.createIndex('age', 'age', { unique: false });
            // }

            var testStore;
            // 新建数据库
            if (!db.objectStoreNames.contains('test')) {
                // 自动生成主键 autoIncrement
                testStore = db.createObjectStore('test', { keyPath: 'id', autoIncrement: true });
                testStore.createIndex('name', 'name', { unique: false });
                testStore.createIndex('email', 'email', { unique: false });
            }
        }
        form.addEventListener('submit', addData)
        function addData(e) {
            e.preventDefault()
            if (!todoTitle.value || !todoDesc.value) return alert('表单未填写完整')
            const data = { name: todoTitle.value, email: todoDesc.value };
            console.log(data, 'data', db);
            // 开启事务
            const transaction = db.transaction(['person'], 'readwrite');
            const objectStore = transaction.objectStore('person');
            const request = objectStore.add(data)
            request.onsuccess = function (event) {
                console.log('写入成功');
                form.reset()
            }
            request.onerror = function (event) {
                console.log('写入失败');
            }
            transaction.oncomplete = function () {
                console.log('事务完成');

            };
            transaction.onerror = function (event) {
                console.log('事务错误:', event.target.error);
                alert(event.target.error)
            };
        }

        function getIndexDBdData() {
            var objectStore = db.transaction('person').objectStore('person');
            const list = []
            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;

                if (cursor) {
                    // const data = {id: cursor.key, name: cursor.value.name, email: cursor.value.email }
                    list.push({id: cursor.key, name: cursor.value.name, email: cursor.value.email })
                    cursor.continue();
                } else {
                    var node = document.createDocumentFragment()
                    for (let i = 0; i < list.length; i++) {
                        const element = list[i];
                        const listItem = document.createElement('li');
                        const h3 = document.createElement('h3');
                        const pg = document.createElement('p');
                        h3.textContent = '姓名：' + element.name;
                        pg.textContent = '邮箱：' + element.email;
                        listItem.appendChild(h3);
                        listItem.appendChild(pg);
                        node.appendChild(listItem)
                    }
                    todos.appendChild(node);
                    console.log('没有更多数据了！');

                }
            };
        }
    </script>
</body>

</html>
```

