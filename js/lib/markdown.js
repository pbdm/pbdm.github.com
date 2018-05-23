import replaceLink from './markdown-it-replace-link.js';
import anchor from './markdown-it-anchor.js';
import taskList from './markdown-it-task-lists.js';

const md = markdownit({
  html: true,
  replaceLink: function(link) {
    if (link.indexOf('http') === 0 || link.indexOf('https') === 0) {
      return link;
    } else {
      return '/' + link;
    }
  },
  highlight: function(code, lang) {
    // const highlighted = hljs.highlightAuto(code).value;
    if (lang === 'mermaid') {
      return '<div class="mermaid">' + code + '</div>';
    } else if (lang === 'seq') {
      return '<div class="seq">' + code + '</div>';
    } else if (lang === 'flow') {
      return '<div class="flow">' + code + '</div>';
    } else {
      const cl = lang || 'javascript';
      const prism = Prism.languages[cl] || Prism.languages.javascript
      const html = Prism.highlight(code, prism, cl);
      return `<pre class="language-${cl}"><code>${html}</code></pre>`;
    }
  }
}).use(replaceLink).use(anchor).use(taskList);

export default md;
