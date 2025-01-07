// vite.config.ts
import { defineConfig } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
export default defineConfig({
  plugins: [vueSetupExtend()],
  server: {
    proxy: {
      '/api/weather': {
        target: 'https://fsblogs.com.cn/api/weather',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, '')
      }
    }
  },
})
