import markdownit from 'markdown-it'
import frontMatter from 'markdown-it-front-matter';
import markdownItAnchor from 'markdown-it-anchor';
import jsyaml from 'js-yaml'
import prismjs from 'prismjs'
import 'prismjs-tomorrow-theme/prism-tomorrow.css'
import 'github-markdown-css/github-markdown.css'

let frontMatterData;

const md = markdownit({
  html: true,
  highlight: function(code, lang) {
    if (lang === 'mermaid') {
      return '<div class="mermaid">' + code + '</div>';
    } else {
      const cl = lang || 'javascript';
      const prism = prismjs.languages[cl] || prismjs.languages.javascript
      const html = prismjs.highlight(code, prism, cl);
      return `<pre class="language-${cl}"><code>${html}</code></pre>`;
    }
  }
})
.use(frontMatter, function(fm:string) {
  try {
    frontMatterData = jsyaml.load(fm)
  } catch {
    frontMatterData = {}
  }
})
.use(markdownItAnchor)

export function parseData (data: string) {
  frontMatterData = {};
  return {
    content: md.render(data),
    frontMatter: frontMatterData
  }
}
