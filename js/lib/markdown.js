import replaceLink from './markdown-it-replace-link.js';
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
    const highlighted = hljs.highlightAuto(code).value;
    if (lang === 'mermaid') {
      return '<div class="mermaid">' + code + '</div>';
    } else if (lang === 'seq') {
      return '<div class="seq">' + code + '</div>';
    } else if (lang === 'flow') {
      return '<div class="flow">' + code + '</div>';
    } else {
      return `<pre><code class="hljs">${highlighted}</code></pre>`;
    }
  }
}).use(replaceLink);

export default md;
