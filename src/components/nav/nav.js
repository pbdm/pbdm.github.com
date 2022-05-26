import markdown from '../../lib/markdown.js';
import { get } from '../../lib/util.js';

const template = `
  <link href="/src/components/nav/nav.css" rel="stylesheet">
  <nav id="nav"></nav>
`

export class Nav extends HTMLElement {

  async fetchPostList() {
    const data = await get(`/posts/SUMMARY.md`);
    return markdown(data).content;
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ 
      mode: "open" 
    });
    shadow.innerHTML = template;
    shadow.addEventListener('click', e => {
      const target = e.target;
      if (target.tagName === 'A') {
        const url = target.getAttribute('href');
        if (url.indexOf('slides.html') === -1) {
          e.preventDefault();
          window.history.pushState(null, null, url.replace('.md', '.html'));
        }
      }
    });
  }

  async connectedCallback() {
    const content = await this.fetchPostList();
    const nav = this.shadowRoot.getElementById('nav');
    nav.innerHTML = content;
  }

}

window.customElements.define('custom-nav', Nav);
