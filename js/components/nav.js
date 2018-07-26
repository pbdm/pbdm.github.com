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
        e.preventDefault();
        window.history.pushState(null, null, target.getAttribute('href').replace('.md', '.html'));
      }
    });
  }

  created() {
    return this.fetchPostList();
  }
}
