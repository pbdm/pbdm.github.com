# PBDm

## Introduction

[![npm version](https://badge.fury.io/js/pbdm.cc.svg)](https://www.npmjs.com/package/pbdm.cc)
[![Dependency Status](https://img.shields.io/david/pbdm/pbdm.github.com.svg?style=flat-square)](https://david-dm.org/pbdm/pbdm.github.com)
[![devDependency Status](https://img.shields.io/david/dev/pbdm/pbdm.github.com.svg?style=flat-square)](https://david-dm.org/pbdm/pbdm.github.com#info=devDependencies)

[PBDm](http://pbdm.cc)'s personal site

## Start

`npm install`

`npm run start` to run and test

`npm run build` to build

## TODO

- [X] change marked to markdown-it
  - [X] 链接中有空格无法解析
- [X] remove webpack, use `<script type="module">`
- [ ] 使用 [spa-github-pages](https://github.com/rafrex/spa-github-pages) 待定, 这东西过于hack, 重定向到404.html会导致http返回码不正确
  - [ ] browser history
- [ ] replace trigger to setter and getter like vue
- [ ] [jekyll config](https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/)
- [ ] add mermaid
- [ ] clean css
- [ ] check test
- [ ] .travis.yml(like hexo)
- [ ] [hakimel/reveal.js](https://github.com/hakimel/reveal.js/)
- [ ] event listener for toc
- [ ] queryString(select button) for hide nav bar
- [ ] add [remark](https://github.com/gnab/remark) toggle function
- [ ] 接入评论系统 (野狗, duoshuo, disqus)
- [ ] 单页面应用搜索引擎
- [ ] ~~输出RSS~~
- [ ] Fix back to top
- [ ] hot reload for dev
- [ ] 支持甘特图 [gant-diagrams](https://knsv.github.io/mermaid/#gant-diagrams)
- [ ] 使用 [core-decorators](https://github.com/jayphelps/core-decorators.js)(暂缓, decorator还在draft里)
- [ ] 自动下载pdf, 使用 [markdown-pdf](https://www.npmjs.com/package/markdown-pdf)
- [ ] 子组件机制?! 什么鬼....
- [ ] change `highlight.js` to [prismjs](http://prismjs.com/)
- [ ] [Loading a Modern Application with <script type=module>](https://matthewphillips.info/posts/loading-app-with-script-module)

### pbdm.cc with playground

- [ ] add playground browser
- [ ] add other playground

### server side version(branch develop)

- [ ] 使用 [pageAccelerator](pageAccelerator)(pjax)
- [ ] webhook from github
- [ ] [nginx配置优化](http://imququ.com/post/my-nginx-conf-for-wpo.html)
- [ ] websocket, 参考 [barretlee](https://github.com/barretlee/blogChat/blob/master/index.js)
- [ ] https, http2
