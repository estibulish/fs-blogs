export default [
    { text: '主页', link: '/' },
    { text: '博客', link: '/articles/' },
    {
        text: '前端',
        items: [
            { text: 'js部落', link: '/frontend/js/canvas_signature' },
            { text: 'css篇', link: '/frontend/css/navigation_bar' },
            { text: 'git学习', link: '/frontend/git/git-workflow' },
            { text: 'vue篇', link: '/frontend/vue/configure_ssr' },
            { text: '小程序篇', link: '/frontend/mini_program/' },

        ]
    },
    { 
        text: '其他',
        items: [
            { text: '公务员考试资料', link: '/other/information/travel_test' },
        ]
    },
    { 
        text: '书籍',
        items: [
            { text: '老友记', link: '/books/friends' },
        ]
    },
    { text: '组件库文档', link: '/components/ElButton/base' },
]