import BasePage from './base.js';
import markdown from '../lib/markdown.js';
import { get } from '../lib/util.js';

export default class Header extends BasePage {
  constructor() {
    super();
  }

  fetchPostList() {
    let template = '';
    return get(`/posts/SUMMARY.md`).then(data => {
      template += markdown.render(data);
      return template;
    });
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
    return Promise.resolve(this.fetchPostList());
  }
}
