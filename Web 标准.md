## 标准组织
### IETF
- The Internet Engineering Task Force
- [IETF 官网](http://ietf.org/)
- [Request for Comments](https://www.ietf.org/rfc.html) (RFC,记录互联网规范、协议、过程等的标准文件)
- [RFC Search ttPage](https://www.rfc-editor.org/search/rfc_search.php)
### WHATWG
- Web Hypertext Application Technology Working Group
- [WHATWG 官网](https://whatwg.org/)
- [WHATWG Standards](https://spec.whatwg.org/)
### W3C
- World Wide Web Consortium
- [W3C 官网](https://www.w3.org/)
- [ALL STANDARDS AND DRAFTS in W3C](https://www.w3.org/TR/)
- W3C 标准[制定步骤](https://www.w3.org/Consortium/Process/)(maturity levels)
	- Editor's Drafts(ED)(只代表个人意见)
	- First Public Working Drafts(FPWD)
	- Working Drafts(WD)
	- Last Call Working Draft(LCWD) 持续时间不长, 告诉人们 WD 马上就要成为 CR 了, 要提意见赶紧提...
	- Candidate Recommendation(CR)
	- Proposed Recommendation(PR)
	- W3C Recommendation(REC)
	- Working Group Note, Interest Group Note (NOTE): 只是一个有用的文档, 并不构成标准
### ECMA
- [Ecma International 官网](https://www.ecma-international.org/)
- 下面的 [TC39](https://www.ecma-international.org/memento/tc39.htm) 小组负责制定ECMAScript 标准
- [The TC39 Process](https://tc39.es/process-document/)
	- Stage0: 开放提交阶段(Strawman)
	- Stage1: Proposal
	- Stage2: Draft
	- Stage3: Canidate
	- Stage4: Finished: 需要至少两个实现
- [被废弃的标准提议列表](https://github.com/tc39/proposals/blob/master/inactive-proposals.md)
## 三件套对应的标准
### HTML
- [HTML Standard - WHATWG](https://html.spec.whatwg.org/multipage/)
	- [HTML Standard - WHATWG 中文](https://whatwg-cn.github.io/html/)
- [~~HTML - W3C~~](https://www.w3.org/TR/html/)
	- [~~HTML Editor’s Draft - W3C~~](https://w3c.github.io/html/)
- [HTML/W3C-WHATWG-Differences](https://www.w3.org/wiki/HTML/W3C-WHATWG-DifferenHTML)
- [以后都将以 WHATWG 的 HTML 和 DOM 为标准了](https://www.w3.org/blog/news/archives/7753)
### ECMAScript
- [ECMAScript Language Specification(ECMA-262)](http://www.ecma-international.org/ecma-262/)
- [ECMAScript® 2016 Language Specification](http://www.ecma-international.org/ecma-262/7.0/index.html)
- [ECMAScript 2015 Language Specification – ECMA-262 6th Edition](http://www.ecma-international.org/ecma-262/6.0/)
- [ECMAScript Language Specification - ECMA-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/)

[State of Javascript](https://stateofjs.com/)
[Map of Javascript](https://github.com/mechaniac/Map-of-Javascript)
[Javascript 20年](https://github.com/doodlewind/jshistory-cn)

### CSS
- [CSS SPEC­I­FI­CA­TIONS](https://www.w3.org/Style/CSS/current-work)
- [正在修改的 CSS 标准列表(Up­com­ing)](https://drafts.csswg.org/)
## 标准实现状态

- [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)
- [腾讯 X5 Caniuse Tests](http://res.imtt.qq.com/tbs/incoming20160419/home.html)
- [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
- [Node.js ES support](https://node.green/)
- [WebKit Feature Status](https://webkit.org/status/)
- [Chrome Platform Status](https://www.chromestatus.com/features)
- [Web Bugs](https://github.com/webcompat/web-bugs/issues): 一个搜集浏览器适配 BUG 的地方 
- [实验功能](https://web.dev/learn/pwa/experimental)
	- [Chrome](https://developer.chrome.com/origintrials/#/trials/active)
	- [Edge](https://microsoftedge.github.io/MSEdgeExplainers/origin-trials/)(部分复用 Chrome)
	- Safari：只支持用户自行打开
### Blink
2013年从 Webkit fork
Blink and Chromium are not really separable anymore, 所以他们的 source code 是在一起的
- [Git repositories on Chromium](https://chromium.googlesource.com/)
- [Chromium homepage](https://www.chromium.org/Home)
- [Chromium For Developers(guide)](http://www.chromium.org/developers)
- [Chromium source code](https://chromium.googlesource.com/chromium/src/)（注意, 直接进入的那个貌似已经废弃了）
	- 注意：库很大，需要机器性能很好再 clone
- [Chromium 源码目录结构介绍](http://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code)
- [Chromium Bug tracker](https://bugs.chromium.org/p/chromium/issues/list)
- [Checking out and building Chromium for Mac](https://chromium.googlesource.com/chromium/src/+/master/docs/mac_build_instructions.md)
- [Chromium Code Search](https://cs.chromium.org/)
- [Blink homepage](https://www.chromium.org/blink)
	- [Blink source code](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/third_party/blink)
	- [~~Blink 源码目录现在还叫webkit~~](https://groups.google.com/a/chromium.org/forum/#!topic/platform-architecture-dev/DKQn-SILZzo/discussion)
### Webkit
- [getting the code](https://webkit.org/getting-the-code/)
- [source code](https://trac.webkit.org/browser/webkit/trunk)
- [source code mirror in github](https://github.com/WebKit/webkit)
### Servo

基于 Rust, Mozilla 的实验性项目，支持**并行**渲染！！等着他并入 firefox 的那一天吧。 [source code](https://github.com/servo/servo)

### JS 引擎

- [[V8]] — open source, developed by Google, written in [[C++]], used in [[Chrome]](blink) and nodejs
- JavaScriptCore — open source, marketed as Nitro and developed by Apple for Safari(webkit)
	- [[React Native]] 默认使用的也是 JavaScriptCore
- Chakra - `JScript9` for Internet Explorer and `JavaScript` for Microsoft Edge
- SpiderMonkey — the first JavaScript engine, which back in the days powered Netscape Navigator, and today powers Firefox

- Rhino — managed by the Mozilla Foundation, open source, developed entirely in Java
- KJS — KDE’s engine originally developed by Harri Porten for the KDE project’s Konqueror web browser
- Nashorn - open source as part of OpenJDK, written by Oracle [[JAVA]] Languages and Tool Group
- JerryScript — is a lightweight engine for the Internet of Things
- [QuickJS](https://github.com/quickjs-zh/QuickJS) - 小型并且可嵌入的Javascript引擎，它支持 ES2020 规范, 包括模块, 异步生成器和代理器
## 标准测试工具

- [web-platform-tests](https://web-platform-tests.org/) WEB 标准的回归测试
- [Test262: ECMAScript Test Suite](https://github.com/tc39/test262)
	- [Test262 Report](https://test262.report/)
- [HTML5 test: how well does your browser support html5?](http://html5test.com/)
- [Acid2 测试, 如果渲染正确, 浏览器打开测试页面会看到一个笑脸(已过时)](https://www.webstandards.org/action/acid2/index.html)
- [Acid3 测试, 满分 100 分](http://acid3.acidtests.org/)
 
> [Web Development History](https://webdevelopmenthistory.com/index/)
> 
> [ES6、ES7、ES8、ES9、ES10新特性一览 by 上沅兮](https://juejin.im/post/5ca2e1935188254416288eb2)
> 
> [ES5 整理 by 颜海镜](http://yanhaijing.com/es5/#about)
> 
> [How JavaScript works: inside the V8 engine by Alexander Zlatkov](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
> 
> [深入理解JSCore by 唐笛](https://tech.meituan.com/2018/08/23/deep-understanding-of-jscore.html)
