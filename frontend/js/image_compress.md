
# 图片压缩


## 核心压缩函数
```javascript
// 核心压缩函数
function compressImage(file, options) {
    return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
        // 创建Canvas元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 计算调整后的尺寸
        let { width, height } = img;
        if (width > options.maxWidth || height > options.maxHeight) {
        const ratio = Math.min(
            options.maxWidth / width,
            options.maxHeight / height
        );
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
        }

        // 设置Canvas尺寸
        canvas.width = width;
        canvas.height = height;

        // 绘制图片到Canvas
        ctx.drawImage(img, 0, 0, width, height);

        // 转换为Blob
        canvas.toBlob(
        (blob) => {
            if (!blob) return reject(new Error('压缩失败'));
            resolve(blob);
        },
        'image/jpeg',  // 输出格式
        options.quality // 压缩质量
        );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
    });
}
```

## 使用示例和效果

:::demo 

``` vue
<template>
    <div class="container">
    <input type="file" id="fileInput" accept="image/*">
    <div id="originalInfo" class="info"></div>
    <div id="compressedInfo" class="info"></div>
    <div>
      <h4>原始图片预览：</h4>
      <img id="originalPreview">
    </div>
    <div>
      <h4>压缩后图片预览：</h4>
      <img id="compressedPreview">
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
    init()
})

function init() {
    // 获取DOM元素
    const fileInput = document.getElementById('fileInput');
    const originalPreview = document.getElementById('originalPreview');
    const compressedPreview = document.getElementById('compressedPreview');
    const originalInfo = document.getElementById('originalInfo');
    const compressedInfo = document.getElementById('compressedInfo');

    // 处理文件选择
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        // 步骤1: 读取原始图片并预览
        const originalDataUrl = await readFileAsDataURL(file);
        console.log(originalDataUrl,'originalDataUrl');
        
        originalPreview.src = originalDataUrl;
        originalInfo.textContent = `原始文件：${formatSize(file.size)}`;

        // 步骤2: 压缩图片
        const compressedBlob = await compressImage(file, {
          quality: 0.7,     // 压缩质量（0-1）
          maxWidth: 1980,    // 最大宽度
          maxHeight: 1080   // 最大高度
        });

        console.log(compressedBlob,'compressedBlob');
        

        // 步骤3: 显示压缩结果
        compressedPreview.src = URL.createObjectURL(compressedBlob);
        console.log(compressedPreview.src,'compressedPreview.src');
        
        compressedInfo.textContent = `压缩后文件：${formatSize(compressedBlob.size)} (质量: 70%)`;
      } catch (err) {
        console.error('压缩失败:', err);
      }
    });

    // 工具函数：将文件读取为DataURL
    function readFileAsDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    // 核心压缩函数
    function compressImage(file, options) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          // 创建Canvas元素
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // 计算调整后的尺寸
          let { width, height } = img;
          if (width > options.maxWidth || height > options.maxHeight) {
            const ratio = Math.min(
              options.maxWidth / width,
              options.maxHeight / height
            );
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
          }

          // 设置Canvas尺寸
          canvas.width = width;
          canvas.height = height;

          // 绘制图片到Canvas
          ctx.drawImage(img, 0, 0, width, height);

          // 转换为Blob
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error('压缩失败'));
              resolve(blob);
            },
            'image/jpeg',  // 输出格式
            options.quality // 压缩质量
          );
        };

        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    }

    // 格式化文件大小显示
    function formatSize(bytes) {
      if (bytes === 0) return '0 B';
      const units = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
    }
}
</script>

<style lang="scss" scoped>
    .container { margin: 20px; }
    img { max-width: 300px; display: block; margin: 10px 0; }
    .info { color: #666; margin: 5px 0; }
</style>
```

:::
