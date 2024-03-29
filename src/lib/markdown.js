import snippet from './markdown-it-snippet.js';
import frontMatter from './markdown-it-front-matter.js';

let frontMatterData = {};

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
    if (lang === 'mermaid') {
      return '<div class="mermaid">' + code + '</div>';
    } else {
      const cl = lang || 'javascript';
      const prism = Prism.languages[cl] || Prism.languages.javascript
      const html = Prism.highlight(code, prism, cl);
      return `<pre class="language-${cl}"><code>${html}</code></pre>`;
    }
  }
})
.use(markdownitReplaceLink)
.use(snippet)
.use(frontMatter, function(fm) {
  try {
    frontMatterData = jsyaml.load(fm)
  } catch {
    frontMatterData = {}
  }
})
.use(anchor)
.use(markdownitTaskLists)
.use(...createContainer('tip'))
.use(...createContainer('warning'))
.use(...createContainer('danger'))

function createContainer (type) {
  return [markdownitContainer, type, {
    render (tokens, idx) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        return `<div class="${type} custom-block">\n`
      } else {
        return `</div>\n`
      }
    }
  }]
}

const getData = function(data) {
  frontMatterData = {};
  return {
    content: md.render(data),
    frontMatter: frontMatterData
  }
}

export default getData;
