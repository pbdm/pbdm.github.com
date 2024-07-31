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
        text: 'Web 标准',
        link: 'Web 标准'
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
