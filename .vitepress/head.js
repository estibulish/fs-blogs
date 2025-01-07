export default [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=TAG_ID' }
    ],
    [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
    ],
    // 百度统计
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?b9eba2b448a751c91faa48d276105c9a";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    ],
    [
        "meta",
        {
          name: "keywords",
          content:
            "技术方, 前端技术分享, 编程知识百科,分享前端有趣的知识",
        },
      ],
    // [
    //     "link",
    //     { rel: "stylesheet", href: "https://mp-61772d50-6ed1-449d-b4da-358c517bd21d.cdn.bspapp.com/resources/fancybox.css" },
    // ],
    // ["script", { src: "https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.umd.js" }],

]