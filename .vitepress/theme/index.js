// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './custom.scss' // 引入自定义 CSS

import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'

// import { VPDemo } from '../vitepress'

import fsCard from '../components/fs-card/index.vue'

import Confetti from "./components/Confetti.vue";
import Weather from "../components/weather/Weather.vue";

import 'viewerjs/dist/viewer.min.css';
// 一款基于 viewerjs 的 vitepress 图片查看器（图片预览）插件
import imageViewer from 'vitepress-plugin-image-viewer';
import { useRoute } from 'vitepress';
import Layout from './Layout.vue';

export default {
    ...DefaultTheme,
    Layout: Layout,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // 注册全局组件，如果你不想使用也可以不添加
        // ctx.app.component('vImageViewer', vImageViewer);
        // ...
        ctx.app.use(ElementPlus)
        useComponents(ctx.app)
        ctx.app.component('FsCard', fsCard);
        ctx.app.component("Confetti", Confetti); //注册全局组件
        ctx.app.component("Weather", Weather); //注册全局组件
        // ctx.app.component('Demo', VPDemo)
        
    },
    setup() {
        // 获取路由
        const route = useRoute();
        // 使用
        imageViewer(route);
    }
};