import markdown from '../lib/markdown.js';
import BasePage from './base.js';
import { get } from '../lib/util.js';
import { setGraph } from '../lib/graph.js';
import { setImport } from '../lib/markdown-it-snippet.js';
import Toc from '../lib/toc.js';

export default class Post extends BasePage {
  constructor(type, file) {
    super();
    this.type = type;
    this.file = file.replace('.html', '.md');
  }

  async fetchPostDetail() {
    let link;
    if (this.type === 'others') {
      link = `/${this.type}/${this.file}`
    } else {
      link = `/posts/${this.type}/${this.file}` 
    }
    const data = await get(link);
    if (data.indexOf('<!DOCTYPE html>') === 0) {
      return '404';
    } else {
      if (data.indexOf('name') === 0) {
        return '';
      } else {
        return `
            ${markdown.render(data)}
          `;
      }
    }
  }

  created() {
    return this.fetchPostDetail();
  }

  mounted(element) {
    setGraph();
    setImport();
    // TODO init toc in constructor or after onload(image size problem)?
    this.toc = new Toc(element);
    this.toc.scrollToAnchor();
  }

  beforeDestroy() {
    this.toc.removeToc();
  }
}
