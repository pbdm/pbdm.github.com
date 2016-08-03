var app = require('koa')()
var middlewares = require('koa-middlewares');

var logger = middlewares.logger;
var router = middlewares.router();
var render = middlewares.ejs;
var path = require('path');
var Config= require('./config');
var Util = require('./util');

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
  year: Config.year
}

const postData = Util.getPostListData(Config.paths)

router
  .get('/', function *(next) {
    data.posts = postData
    data.page = 'home'
    yield this.render('home', data)
  })
  .get('wiki', '/wiki/:name?', function *(next) {
    let d = Util.getPostData(postData, 'wiki', this.params.name, data)
    d.page = 'wiki'
    yield this.render('post', d)
  })
  .get('blog', '/blog/:name?', function *(next) {
    let d = Util.getPostData(postData, 'blog', this.params.name, data)
    d.page ='post'
    yield this.render('post', d)
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
