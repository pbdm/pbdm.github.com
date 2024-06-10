import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "琥珀草",
  description: "+1s",
  lang: 'zh-Hans',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }],
    ['link', { rel: 'apple-touchicon', href: '/img/touch-icon.png' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-LRHFRD2P8H' }
    ],
    [
      'script',
      {},
      ` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-LRHFRD2P8H');`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/README' },
      { text: 'CHANGELOG', link: '/CHANGELOG' }
    ],
  
    sidebar: [
      {
        items: [
          { text: '简介', link: '/README' },
        ]
      },
      {
        text: '前端标准',
        items: [
          { text: 'WEB 标准', link: '/前端标准/Web 标准' },
          { text: 'ECMAScript', link: '/前端标准/ECMAScript' },
          { text: '浏览器标准实现', link: '/前端标准/浏览器标准实现' }
        ]
      }
    ],
  
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pbdm' }
    ]
  },
  lastUpdated: true,
  vite: {
    server: {
      port: 2222
    } 
  }
})
