# xgplayer 西瓜视频播放器

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name=viewport
        content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui">
    <meta name="referrer" content="no-referrer">
    <title>xgplayer</title>
    <style type="text/css">
        html,
        body {
            width: 100%;
            height: 100%;
            margin: auto;
            overflow: hidden;
        }

​        body {
​            display: flex;
​        }

​        #mse {
​            flex: auto;
​        }
​    </style>

    <script type="text/javascript">
        window.addEventListener('resize', function () { document.getElementById('mse').style.height = window.innerHeight + 'px'; });
    </script>

</head>

<body>

    <div id="mse"></div>
    <script src="https://unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js" charset="utf-8"></script>
    <script type="text/javascript">
        let player = new Player({
            id: 'mse',
            autoplay: false,
            volume: 0.3,
            url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
            poster: "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
            playsinline: true,
            height: window.innerHeight,
            width: window.innerWidth,
            playbackRate: [0.5, 0.75, 1, 1.5, 2],
            pip: true,
            miniplayer: true,
            cssFullscreen: true,
            screenShot: {
                saveImg: true,
                quality: 0.92,
                type: 'image/png',
                format: '.png'
            }
        });
    </script>

</body>

</html>
```

## 效果

![/edfb1fd3132c862e67b0890734f2864.png](/edfb1fd3132c862e67b0890734f2864.png)

# 自定义播放器

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>自定义播放器</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .clearfix:after {
            content: "";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }

        .clearfix {
            *zoom: 1;
        }

        #wrap {
            width: 600px;
            margin: 50px auto;
        }

        #video {
            width: 100%;
        }

        button {
            width: 69px;
            height: 30px;
            border: none;
            background: #f9c;
            float: left;
            border-radius: 5px;
            margin: 3px;
        }

        button:hover {
            position: relative;
            top: 1px;
            left: 1px;
            background: red;
        }

        #progress {
            width: 100%;
            height: 13px;
            background: gray;
            margin-top: -3px;
        }

        #bar {
            width: 0;
            height: 13px;
            background: red;
        }
    </style>
</head>

<body>
    <div id="wrap">
        <!-- 播放器 -->
        <video id="video" loop="loop"
            poster="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/816c13440f694e779d1f6f35e1f88788~tplv-k3u1fbpfcp-watermark.image">
            您的浏览器不支持 video 视频播放
            <source src="https://www.runoob.com/video/php/friday.mp4">
            <source src="https://www.runoob.com/video/php/friday.ogg">
        </video>
        <!-- 进度条 -->
        <div id="progress">
            <p id="bar"></p>
        </div>
        <!-- 按钮 -->
        <div class="clearfix">
            <button id="play">播放</button>
            <button id="pause">暂停</button>
            <button id="volume1">音量加</button>
            <button id="volume2">音量减</button>
            <button id="currentTime1">快进10s</button>
            <button id="currentTime2">快退10s</button>
            <button id="playbackRate1">加速播放</button>
            <button id="playbackRate2">减速播放</button>
            <button id="big">大屏幕</button>
            <button id="cen">中屏幕</button>
            <button id="lit">小屏幕</button>
        </div>
    </div>
    <script>
        // 通过id找对象函数
        function $(id) {
            return document.getElementById(id)
        };
        // 获取元素样式函数
        function getStyle(obj, attr) {
            var css = obj.currentStyle || getComputedStyle(obj, null);
            return css[attr]
        }
        // 加载事件
        window.addEventListener('load', inital, false);
        function inital() {
            var video = $('video');
            var duration = video.duration; //视频总时长;
            // 进度条运动函数
            var bar = $('bar');
            var timer = null;
            function run() {
                var currentTime = video.currentTime; //视频当前播放的时长;
                bar.style.width = currentTime / duration * 100 + '%';//进度百分百
            }
            // 点击改变进度条进度,控制视频播放进度;
            var progress = $('progress');
            progress.addEventListener('click', progress_click, false);
            function progress_click(ev) {
                var oEvent = ev || event;//兼容处理;
                var px = oEvent.clientX; //鼠标点击位置的横坐标位置;
                var pl = progress.offsetLeft;//div到浏览器左边的距离;
                var bwidth = px - pl; //鼠标点击位置进度条的长度;
                var pwidth = parseInt(getStyle(progress, 'width'));
                bar.style.width = bwidth / pwidth * 100 + '%'; //进度条进度
                video.currentTime = duration * (bwidth / pwidth);//视频播放进度
            }
            // 播放
            var play = $('play');
            play.addEventListener('click', play_click, false);
            function play_click() {
                video.play();
                timer = setInterval(run, 1000) //开启定时器
            };

            // 暂停
            var pause = $('pause');
            pause.addEventListener('click', pause_click, false);
            function pause_click() {
                video.pause();
                clearInterval(timer) //清除定时器
            };

            // 音量加
            var volume1 = $('volume1');
            volume1.addEventListener('click', volume1_click, false);
            function volume1_click() {
                if (video.volume >= 1) {
                    alert('音量已最大');
                    return
                }
                video.volume += 0.2;
                video.volume = video.volume.toFixed(2);//解决小数运算精度问题
            };

            // 音量减
            var volume2 = $('volume2');
            volume2.addEventListener('click', volume2_click, false);
            function volume2_click() {
                if (video.volume <= 0) {
                    alert('音量已为零');
                    return
                }
                video.volume -= 0.2;
                video.volume = video.volume.toFixed(2);//解决小数运算精度问题
            }

            // 快进
            var currentTime1 = $('currentTime1');
            currentTime1.addEventListener('click', currentTime1_click, false);
            function currentTime1_click() {
                video.currentTime += 10;
            }

            // 快退
            var currentTime2 = $('currentTime2');
            currentTime2.addEventListener('click', currentTime2_click, false);
            function currentTime2_click() {
                video.currentTime -= 10;
            }

            // 加速
            var playbackRate1 = $('playbackRate1');
            playbackRate1.addEventListener('click', playbackRate1_click, false);
            function playbackRate1_click() {
                video.playbackRate += 0.5;
                video.playbackRate = video.playbackRate.toFixed(2);//解决小数运算精度问题
            }

            // 减速
            var playbackRate2 = $('playbackRate2');
            playbackRate2.addEventListener('click', playbackRate2_click, false);
            function playbackRate2_click() {
                video.playbackRate -= 0.5;
                video.playbackRate = video.playbackRate.toFixed(2);//解决小数运算精度问题
            }

            // 播放屏幕大小
            $('big').onclick = function () {
                $('wrap').style.width = '900px';
            }
            $('cen').onclick = function () {
                $('wrap').style.width = '600px';
            }
            $('lit').onclick = function () {
                $('wrap').style.width = '300px';
            }
        }
    </script>
</body>

</html>
```

## 效果

![/03b79084d0582b9e150072bc64c1ed6.png](/03b79084d0582b9e150072bc64c1ed6.png)
