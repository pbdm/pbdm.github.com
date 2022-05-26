import markdown from '../../lib/markdown.js';
import { get, getScrollingElement } from '../../lib/util.js';
import { setImport } from '../../lib/markdown-it-snippet.js';

const template = `
  <link href="/src/components/post/post.css" rel="stylesheet">
  <link href="//cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" rel="stylesheet">
  <link href="//cdn.jsdelivr.net/npm/prismjs@1.14.0/themes/prism-tomorrow.css" rel="stylesheet">
  <div class="info">
    <div id="tags"></div>
    <span id="created"></span>
    <span id="updated"></span>
    /
    <a id="github">修改历史</a>
    /
    <a id="edit">编辑</a>
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
    this.renderUpdated()
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
        return {
          content: '',
          frontMatter: ''
        };
      } else {
        return markdown(data);
      }
    }
  }

  renderGithub() {
    this.githubDom = this.shadowRoot.getElementById('github');
    this.githubDom.href = `https://github.com/pbdm/posts/commits/master${this.renderPath}`;

    this.editDom = this.shadowRoot.getElementById('edit');
    this.editDom.href = `https://github.com/pbdm/posts/edit/master${this.renderPath}`;
  }
  async renderUpdated() {
    const dom = this.shadowRoot.getElementById('updated');
    dom.innerHTML = '';
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
    dom.innerHTML = `最后修改时间：${date.split('T')[0]}`;
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

  changeTitle(title) {
    let res;
    if (title) {
      res = title;
    } else {
      const contentH1 = this.main.getElementsByTagName('h1');
      if (contentH1.length > 0) {
        res = contentH1[0].innerText
      }
    }
    if (res) {
      document.title = res + ' | 琥珀草'
    }
  }

  renderCreated(date){
    const dom = this.shadowRoot.getElementById('created');
    if (date) {
      dom.innerText = '创建时间：' + new Date(date).toLocaleString()
    }
  }

  renderTags(tags = []){
    const tagsDom = this.shadowRoot.getElementById('tags');
    if (tags.length > 0) {
      if (Array.isArray(tags)) {
        tagsDom.innerText = '标签：' + tags.join(' ')
      } else {
        tagsDom.innerText = '标签：' + tags
      }
    } else {
      tagsDom.innerText = ''
    }
  }

  async render() {
    const { content, frontMatter = {} } = await this.fetchPostDetail();
    this.main = this.shadowRoot.getElementById('main');
    this.main.innerHTML = content;
    this.changeTitle(frontMatter.title);
    this.renderTags(frontMatter.tags);
    this.renderCreated(frontMatter.created);
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
