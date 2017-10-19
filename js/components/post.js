import markdown from '../lib/markdown.js';
import BasePage from './base.js';
import { get } from '../lib/util.js';
import { setGraph } from '../lib/graph.js';
import Toc from '../lib/toc.js';

export default class Post extends BasePage {
  constructor(type, file) {
    super();
    this.type = type;
    this.file = file;
  }

  fetchPostDetail() {
    return get(`/posts/${this.type}/${this.file}`).then(data => {
      if (data.indexOf('<!DOCTYPE html>') === 0) {
        return '404';
      } else {
        return `
            ${markdown.render(data)}
          `;
      }
    });
  }

  created() {
    return this.fetchPostDetail();
  }

  mounted(element) {
    setGraph();
    // TODO init toc in constructor?
    this.toc = new Toc(element);
  }

  beforeDestroy() {
    this.toc.removeToc();
  }
}
