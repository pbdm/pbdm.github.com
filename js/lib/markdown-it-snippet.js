import { get } from './util.js';
export default function snippet (md, options = {}) {
  const root = options.root || '';
  function parser (state, startLine, endLine, silent) {
    const CH = '<'.charCodeAt(0)
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }
    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i)
      if (ch !== CH || pos + i >= max) return false
    }
    if (silent) {
      return true
    }
    const start = pos + 3
    const end = state.skipSpacesBack(max, pos)
    const path = state.src.slice(start, end).trim().replace(/^@/, root)
    const content = `<div data-src=${path} class="import"></div>`
    state.line = startLine + 1
    const token = state.push('html_inline')
    token.content = content
    return true
  }
  md.block.ruler.before('fence', 'snippet', parser)
}

async function parseImport(element, index, type) {
  var Extensions = {
    'js': 'javascript',
    'py': 'python',
    'sh': 'bash',
    'h': 'c',
    'html': 'html'
  };
  const src = element.dataset.src;
  const extension = (src.match(/\.(\w+)$/) || ['','javascript'])[1];
  const language = Extensions[extension] || extension;
  let html;
  // TODO loading
  try {
    const code = await get(src);
    html = Prism.highlight(code, Prism.languages[language], language);
  } catch (e) {
    html = e.message
  }
  element.innerHTML = `<pre class="language-${language}"><code>${html}</code></pre>`
}

export function setImport() {
  const dom = document.getElementsByClassName('import');
  Array.prototype.forEach.call(dom, function(element, index) {
    parseImport(element, index);
  });
}
