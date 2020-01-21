import markdown from '../../lib/markdown.js';
import { get, getScrollingElement } from '../../lib/util.js';
import { setImport } from '../../lib/markdown-it-snippet.js';

const template = `
  <link href="/src/components/post/post.css" rel="stylesheet">
  <link href="//cdn.jsdelivr.net/npm/prismjs@1.14.0/themes/prism-tomorrow.css" rel="stylesheet">
  <main id="main"></main>
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
    path = path || window.location.pathname
    path = path.replace('.html', '.md');
    let renderPath = path;
    if (path === '/') {
      renderPath = '/INTRO.md';
    }
    await this.render(renderPath);
    this.scrollToAnchor();
  }

  async fetchPostDetail(file) {
    const link = `/posts${file}` 
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

  async render(file) {
    const content = await this.fetchPostDetail(file);
    this.main = this.shadowRoot.getElementById('main');
    this.main.innerHTML = content;
    this.renderMermaid();
    // 用于处理 import playground 里的代码
    setImport();
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
    this.switcher();
  }

}

window.customElements.define('custom-post', Post)
