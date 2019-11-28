import BasePage from './base.js';
import markdown from '../lib/markdown.js';
import { get } from '../lib/util.js';

export default class Header extends BasePage {
  constructor() {
    super();
  }

  async fetchPostList() {
    const data = await get(`/posts/SUMMARY.md`);
    return markdown.render(data); 
  }

  mounted(element) {
    element.addEventListener('click', e => {
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

  created() {
    return this.fetchPostList();
  }
}
