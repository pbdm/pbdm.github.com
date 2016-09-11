var app = require('koa')()
var middlewares = require('koa-middlewares');

var logger = middlewares.logger;
var router = middlewares.router();
var render = middlewares.ejs;
var path = require('path');
var Config= require('./config');
var Util = require('./util');
var marked = require('marked');
var hljs = require('highlight.js');

const renderer = new marked.Renderer();

// for highlight code
renderer.code = (code, lang) => {
  let highlighted;
  if (typeof lang === 'undefined') {
    highlighted = hljs.highlightAuto(code).value;
  } else if (lang === 'flow') {
    return '<div class="flow">'+code+'</div>';
  } else if (lang === 'seq') {
    return '<div class="seq">'+code+'</div>';
  } else if (lang === 'nohighlight') {
    highlighted = code;
  } else {
    highlighted = hljs.highlight(lang, code).value;
  }
  return `<pre><code class="hljs${ lang || ''}">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'base',
  viewExt: 'html',
  cache: false,
  debug: true
});

// 原始数据, 供 base 用
const data = {
  name: Config.name,
  year: new Date().getFullYear()
}

const postData = Util.getPostListData(Config.postPath);

router
  .get('/', function *(next) {
    data.posts = postData
    yield this.render('home', data)
  })
  .get('/:type/:name', function *(next) {
    let d = Util.getPostData(marked, postData, this.params.type, this.params.name, data)
    if (d) {
      yield this.render('post', d)
    } else {
      yield this.render('404', data)
    }
  })
  .get('*', function *(next) {
    yield this.render('404', data)
  })

app
  .use(logger())
  .use(middlewares.staticCache(path.join(__dirname, 'public'), {
    buffer: !Config.debug,
    maxAge: Config.debug ? 0 : 60 * 60 * 24 * 7
  }))
  .use(router.routes())


app.listen(3000)
