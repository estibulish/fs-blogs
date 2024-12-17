# contenteditable输入框

contenteditable属性实现div元素可编辑，插入文本和图片；

template：

```html
<div maxlength="1000" ref="editor" id="editor" class="send-text" :contenteditable="status != 0" @input="editorChange">
	<div class="text-center w-1 text-light-muted" v-if="status == 0"></div>
</div>
```

contenteditable元素添加'paste'粘贴事件:

```js
mounted() {
    // 注册粘贴事件
	document.querySelector('#editor').addEventListener('paste', this.paste);
},
```



```js
methods: {
    paste(event) {
        // 获取剪切板内容
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        let imgInstance = null;
        // 阻止内容粘贴到div中
        event.preventDefault()
        let nodeText = '';
        for (const item of items) {
            console.log(item.type,'item.type');
            // 图片内容
            if (item.type.indexOf('image') !== -1) {
                imgInstance = item;
            } else if (item.type == 'text/plain') { // 获取文本内容
                // 获取文本内容的方法(纯文本)
                item.getAsString((res) => {
                    console.log(res,'item.getAsString');
                    this.insertText(res)
                })
            }
        }
        if(imgInstance) {
            this.insertImage(imgInstance)
        }
    },


    // 图片插入到editor中
    insertImage(imgInstance) {
        if(!imgInstance) return;
        const blob = imgInstance.getAsFile();
        // 处理图片blob
        // 例如，将blob转换成URL并显示在可编辑区域中
        const imageUrl = URL.createObjectURL(blob);
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.maxHeight = '30px';
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.insertNode(imgElement)
        // 取消insert node 后的选中状态，将光标恢复到 insert node 后面
        range.collapse(false)
    },
    // 文本插入到editor中
    insertText(nodeText) {
        const textElement = document.createTextNode(nodeText);
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.insertNode(textElement)
        // 取消insert node 后的选中状态，将光标恢复到 insert node 后面
        range.collapse(false)
    }
}

```

可输入框添加ctrl+enter换行，enter可直接发送：

```js
mounted() {
        // 注册键盘按下事件			
        document.querySelector('#editor').addEventListener('keydown', this.textareaKeydown)
},
methods: {
    // 换行
    insertNewLine() {
        // 在光标位置插入换行符或其他内容的逻辑
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const br = document.createElement('br');
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
    },
    // 键盘
    textareaKeydown(event) {
        // ctrl+enter 实现换行
        if (event.ctrlKey && event.keyCode === 13) {
            console.log('换行');
            this.insertNewLine()
        } else if (event.keyCode === 13) { // enter 直接发送
            // this.sendMessage()
            this.sendOperateMsg()
            event.preventDefault() // 阻止浏览器默认换行操作
            return false
        }
    },
}

```

说明：

1. event有clipboardData属性，clipboardData没有item属性；
2. 只有在textarea里或者可编辑的div里才粘贴才触发paste事件；
3. 在div里粘贴截图，直接显示图片，img.src为base64编码字符串；
4. 在div里粘贴网页图片，表现同chrome。