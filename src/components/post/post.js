import markdown from '../../lib/markdown.js';
import { get, getScrollingElement } from '../../lib/util.js';
import { setImport } from '../../lib/markdown-it-snippet.js';

const template = `
  <link href="/src/components/post/post.css" rel="stylesheet">
  <link href="//cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" rel="stylesheet">
  <link href="//cdn.jsdelivr.net/npm/prismjs@1.14.0/themes/prism-tomorrow.css" rel="stylesheet">
  <div class="info">
    最后更新时间:
    <span id="date"></span>
    /
    <a id="github">修改历史</a>
  </div>
  <main id="main" class="markdown-body"></main>
`

export class Post extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ 
      mode: "open" 
    });
    this.shadowRoot.innerHTML = template;
  }

  set path(path) {
    this.switcher(path)
  }

  async switcher(path) {
    path = path.replace('.html', '.md');
    this.renderPath = path;
    if (path === '/') {
      this.renderPath = '/INTRO.md';
    }
    await this.render();
    this.scrollToAnchor();
    this.renderGithub();
    this.renderDate()
  }

  async fetchPostDetail() {
    let link;
    if (this.renderPath.indexOf('/others') === 0 ) {
      link = this.renderPath
    } else {  
      link = `/posts${this.renderPath}` 
    }
    const data = await get(link);
    if (data.indexOf('<!DOCTYPE html>') === 0) {
      return '404';
    } else {
      if (data.indexOf('name') === 0) {
        return '';
      } else {
        return `${markdown.render(data)}`;
      }
    }
  }

  renderGithub() {
    this.githubDom = this.shadowRoot.getElementById('github');
    this.githubDom.href = `https://github.com/pbdm/posts/commits/master${this.renderPath}`;
  }
  async renderDate() {
    this.dateDom = this.shadowRoot.getElementById('date');
    this.dateDom.innerHTML = '';
    const commitInfo = await get(`https://api.github.com/repos/pbdm/posts/commits?path=${this.renderPath}&page=1&per_page=1`, 'json');
    let date
    try {
      if (commitInfo.length) {
        date = commitInfo[0].commit.author.date; 
      } else {
        date = commitInfo.message.slice(0 ,23);
      }
    } catch (e) {
      console.warn(e);
      date = 'Error'
    }
    this.dateDom.innerHTML = `${date.split('T')[0]}`;
  }

  get container() {
    return this.main;
  }

  renderMermaid() {
    // TODO 也许可以写成 markdown-it 的插件
    const doms = this.main.getElementsByClassName('mermaid');
    Array.prototype.forEach.call(doms, (dom) => {
      function insertSvg(svgCode, bindFunctions) {
        dom.innerHTML = svgCode;
      }
      const graphDefinition = dom.innerText;
      mermaid.mermaidAPI.render('mai', graphDefinition, insertSvg);
    })
  }

  changeTitle() {
    document.title = this.main.getElementsByTagName('h1')[0].innerText + ' | 琥珀草'
  }

  async render() {
    const content = await this.fetchPostDetail();
    this.main = this.shadowRoot.getElementById('main');
    this.main.innerHTML = content;
    this.changeTitle();
    this.renderMermaid();
    // 用于处理 import playground 里的代码
    setImport(this.main);
    this.dispatchEvent(new CustomEvent('rendered') )
  }

  scrollToAnchor() {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    const hashDom = this.shadowRoot.getElementById(hash);
    if (hashDom) {
      getScrollingElement().scrollTo(0, hashDom.offsetTop);
    } else {
      getScrollingElement().scrollTo(0, 0);
    }
  }

  async connectedCallback() {
    // 
  }

}

window.customElements.define('custom-post', Post)
