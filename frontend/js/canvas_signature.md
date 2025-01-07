# canvas签名案例

## 1、html部分

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>canvas签名</title>
    <style>
        #canvas {
            cursor: url('./image/huabi.png') 0 12, auto;
            background-color: #fff;
            image-rendering: -webkit-optimize-contrast;
        }
    </style>
</head>
<body>
    <canvas id="canvas" width="300" height="250" style="border:1px solid #000000;">
        您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
    <div>
        <button class="revoke">撤销</button>
        <button class="resetting">重做</button>
        <button class="export_img">导出图片</button>
        <input type="color" id="stroke_color" onchange="colorChange(this.value)" />
    </div>
    <script src="js/signature.js"></script>
    <script>
        const signature = new Signature(document.getElementById('canvas'))
        // console.log(signature,'signature');
        document.getElementsByClassName('revoke')[0].addEventListener('click',() => {
            signature.revoke()
        })

        document.getElementsByClassName('resetting')[0].addEventListener('click',() => {
            signature.resetting()
        })

        document.getElementsByClassName('export_img')[0].addEventListener('click',() => {
            signature.exportImage()
        })

        function colorChange(value) {
            console.log(value,'value');
            signature.setStrokeColor(value)
        }

    </script>
</body>
</html>
```

## 2、js部分

```js
class Signature {
    ctx = null;
    // 是否按下
    isDown = false;
    strokeColor = '000000';
    strokeWidth = 3;

    constructor(canvas) {
        // 笔画的点
        this.points = [];
        // 所有笔画的点
        this.allPoints = [];
        this.canvas = canvas;
        canvas && this.initCanvas(this.canvas)
    }

    initCanvas(canvas) {
        this.ctx = canvas.getContext('2d')
        // 启用抗锯齿
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // 监听鼠标按下
        canvas.addEventListener('mousedown', ({x,y}) => {
            this.isDown = true;
            // this.lastX = x;
            // this.lastY = y;
            // 保存当前的点为起点
            this.points.push({x,y, strokeStyle: this.ctx.strokeStyle })
            // 创建一个新的路径
            this.ctx.beginPath();
        }, false)

        canvas.addEventListener('mousemove', ({x,y}) => {
            console.log('移动');
            if (!this.isDown) return
            // this.draw(this.lastX,this.lastY, x, y);
            // 每次都取最后一个点，作为绘制的起点
            const lastPoint = this.points.at(-1)
            this.draw(lastPoint.x,lastPoint.y, x, y);
            // 把当前的点保存起来，又作为下一次绘制的起点
            this.points.push({x,y, strokeStyle: this.ctx.strokeStyle})
        
            // this.lastX = x;
            // this.lastY = y;
        }, false)

        canvas.addEventListener('mouseup', () => {
            this.isDown = false;
            // 关闭路径
            this.ctx.closePath();
            // 保存当前画笔组
            this.allPoints.push(this.points)
            this.points = []
        },false)

        canvas.addEventListener('mouseleave', () => {
            this.isDown = false;
            this.ctx.closePath();
            if (this.points.length) {
                this.allPoints.push(this.points)
            }
            this.points = []
        },false)

    }

   

    // 绘制
    draw(startX, startY, endX, endY) {
        // 起点
        this.ctx.moveTo(startX, startY)
        // 终点
        this.ctx.lineTo(endX, endY)
        // 调用 stroke，即可看到绘制的线条
        this.ctx.stroke()
    }

     // 清空画布
    resetPath() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

    // 重置
    resetting() {
        this.resetPath()
        this.allPoints = []
    }

    // 撤销
    revoke() {
        this.resetPath()
        this.allPoints.pop()
        this.allPoints.forEach(ps => {
            ps.forEach((item,index) => {
                let next = ps[index+1];
                if (next) {
                    this.ctx.beginPath()
                    if(index === 0 || ps[index-1].strokeStyle !== item.strokeStyle) {
                        this.ctx.strokeStyle = item.strokeStyle;
                    }
                    this.draw(item.x, item.y, next.x, next.y);
                    this.ctx.closePath()
                }
            })
        })
    }

    // 回退
    backspace() {
        
    }

    setStrokeColor(value) {
        if (value) {
            this.ctx.strokeStyle = value;
        }
    }

    strokeWidth(value) {
        if (value) {
            this.ctx.lineWidth = value;
        }
    }

    exportImage() {
        let imgData = this.canvas.toDataURL('image/png');
        let link = document.createElement('a');
        link.download = Date.now() + 'png';
        link.href = imgData;
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}
```

## 效果

![alt text](/canvas_signature.png)
