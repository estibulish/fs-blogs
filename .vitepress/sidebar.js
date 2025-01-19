export default {
    '/frontend/': [
        {
            text: 'html',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '聊天表情', link: '/frontend/html/emotion' },
            ]
        },
        {
            text: 'javascript部分',
            collapsible: true,
            collapsed: false,
            items: [
                { text: 'canvas签名', link: '/frontend/js/canvas_signature' },
                { text: 'video分片播放', link: '/frontend/js/video_fragmentation' },
                { text: 'video播放器', link: '/frontend/js/xgplayer_video' },
                { text: '工具函数', link: '/frontend/js/tools' },
                { text: 'indexDB数据库', link: '/frontend/js/indexdb' },
                { text: 'Web Worker 使用教程', link: '/frontend/js/worker' },
                { text: '剪贴板操作 Clipboard API', link: '/frontend/js/clipboard' },
                { text: 'Node.js 如何处理 ES6 模块', link: '/frontend/js/node_es6' },
                { text: '计算精度问题', link: '/frontend/js/calculator' },
                { text: 'contenteditable可输入框', link: '/frontend/js/contenteditable' },
                { text: '浏览器notification通知', link: '/frontend/js/browser_notification' },
                { text: 'websocket心跳检测', link: '/frontend/js/websocket' },
            ]
        }, {
            text: 'css篇',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '屏幕安全区域', link: '/frontend/css/navigation_bar' },
            ]
        }, {
            text: 'vue篇',
            collapsible: true,
            collapsed: false,
            items: [
                { text: 'VUE项目配置SSR', link: '/frontend/vue/configure_ssr' },
                { text: 'VUE项目自动打包部署', link: '/frontend/vue/automatic_publish' },
                { text: '前端发版后浏览器缓存问题', link: '/frontend/vue/version_update' },
            ]
        }, {
            text: 'git学习',
            collapsible: true,
            collapsed: false,
            items: [
                { text: 'Git 工作流程', link: '/frontend/git/git-workflow' },
                { text: 'Git 工作区、暂存区和版本库', link: '/frontend/git/git-workspace-index-repo' },
                { text: 'Git 创建仓库', link: '/frontend/git/git-create-repository' },
                { text: 'Git 基本操作', link: '/frontend/git/git-basic-operations' },
                { text: 'Git 分支管理', link: '/frontend/git/git-branch' },
                { text: 'Git 查看提交历史', link: '/frontend/git/git-commit-history' },
                { text: 'Git 标签', link: '/frontend/git/git-tag' },
                { text: 'Git 远程仓库(Github)', link: '/frontend/git/git-remote-repo' },
                { text: 'vitepress项目部署到github', link: '/frontend/git/deploy_github' },
            ]
        }, {
            text: '配置篇',
            collapsible: true,
            collapsed: false,
            items: [
                { text: 'Nginx 配置', link: '/frontend/configure/nginx_config' },
            ]
        }, {
            text: '小程序篇',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '小程序跳转', link: '/frontend/mini_program/navigate' },
            ]
        }, {
            text: 'nginx',
            collapsible: true,
            collapsed: false,
            items: [
                { text: 'nginx配置', link: '/frontend/nginx/nginx_setting' },
            ]
        }, {
            text: '设计模式',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '观察者模式', link: '/frontend/design_mode/observer' },
                { text: '发布-订阅模式', link: '/frontend/design_mode/publish_subscribe' },

            ]
        }, {
            text: '视觉效果',
            collapsible: true,
            collapsed: false,
            items: [
                { text: 'html视觉', link: '/frontend/html_visual/visual' },
            ]
        }
    ],
    '/articles/': [
        {
            text: '文章',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '个人介绍', link: '/articles/' },
            ]
        }
    ],
    '/components/': [
        {
            text: '介绍',
            link: '/components/ElButton/base',
        }
    ],
    '/examples/': [
        {
            text: '介绍',
            link: '/examples/ElButton/base',
        }
    ],
    '/books/': [
        {
            text: '老友记',
            link: '/books/friends',
        }
    ],
    '/other/': [
        {
            text: '公务员考试',
            collapsible: true,
            collapsed: false,
            items: [
                { text: '行测', link: '/other/information/travel_test' },
            ]
        }
    ],
}