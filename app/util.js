var path = require('path');
var fs = require('fs');
var objectAssign = require('object-assign');
var marked = require('marked');
var hljs = require('highlight.js');

// for highlight code
const renderer = new marked.Renderer();
renderer.code = (code, lang) => {
  let highlighted;
  if (typeof lang === 'undefined') {
    highlighted = hljs.highlightAuto(code).value;
  } else if (lang === 'flow') {
    return '<div class="flow">'+code+'</div>';
  } else if (lang === 'seq') {
    return '<div class="seq">'+code+'</div>';
  } else if (lang === 'nohighlight') {
    highlighted = code;
  } else {
    highlighted = hljs.highlight(lang, code).value;
  }
  return `<pre><code class="hljs${ lang || ''}">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

module.exports = {
  // get tree json for post
  tree: function(filepath) {
    filepath = path.normalize(filepath);

    var result = [];

    var files = fs.readdirSync(filepath);

    for (key in files) {
      file = files[key];
      if (files[key].substr(-2,2) === 'md') {
        result.push ({
          date: files[key].substr(0,10),
          fullpath: encodeURIComponent(filepath + '/' + files[key]),
          path: encodeURIComponent(files[key].slice(11,-3).toLowerCase()),
          title: files[key].slice(11,-3)
        });
      }
    }

    return result;
  },

  getPostListData: function(paths) {
    var postData = {};
    var keys = Object.keys(paths);
    for (var i = 0; i < keys.length; i++ ) {
      postData[keys[i]] = this.tree(paths[keys[i]]);
    }
    return postData;
  },

  getPostData: function(postData, type, pathName, data) {
    let r = objectAssign(data, {});
    let datas = postData[type];
    let tmp = datas.filter( (n) => {
      return n.path === encodeURIComponent(pathName)
    });
    let d = tmp[0];
    const file = fs.readFileSync('./' + decodeURIComponent(d.fullpath), 'utf-8')
    const content = marked(file)
    r.date = d.date
    r.title = d.title
    r.content = content
    return r;
  }
}
