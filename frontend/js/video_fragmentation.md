# video分片播放

## 1、html部分

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>video分片播放</title>
</head>

<body>
    <video id="video_blob" controls></video>
    <button onclick="rangeVideo()">播放</button>
</body>

</html>
```

## 2、js部分

```js
<script>
    const rangeVideo = () => {
        const video = document.querySelector('#video_blob')
        const totalSize = 9350042
        const chunkSize = 1000000
        const numChunks = Math.ceil(totalSize / chunkSize)
        let index = 0

        const assetURL = 'https://www.xtr327.com:3000/api/backgroundVideo'
        var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

        if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
            var mediaSource = new MediaSource()
            video.src = URL.createObjectURL(mediaSource)
            mediaSource.addEventListener('sourceopen', sourceOpen)
        } else {
            console.error('Unsupported MIME type or codec: ', mimeCodec)
        }

        function sourceOpen(e) {
            var mediaSource = e.target
            var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)

            const send = () => {
                if (index >= numChunks) {
                    sourceBuffer.addEventListener('updateend', function (_) {
                        mediaSource.endOfStream()
                    })
                } else {
                    const start = index * chunkSize
                    const end = Math.min(start + chunkSize - 1, totalSize - 1)
                    fetch(assetURL, {
                        headers: {
                            Range: `bytes=${start}-${end}`,
                            responseType: 'arraybuffer'
                        }
                    }).then(async (response) => {
                        response = await response.arrayBuffer()
                        index++
                        sourceBuffer.appendBuffer(response)
                        send()
                        video.play()
                    })
                }
            }

            send()
        }
    }
</script>
```

## 效果

![image-20240328141043448](/image-20240328141043448.png)
