var path = require('path');
var fs = require('fs');
var objectAssign = require('object-assign');

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

  // get all post data json from postpath
  getPostListData: function(postPath) {
    var files = fs.readdirSync(postPath);
    var postData = {};
    for (var i = 0; i < files.length; i++ ) {
      if (files[i].substr(0,1) !== '.') {
        postData[files[i]] = this.tree(postPath + '/' + files[i]);
      }
    }
    return postData;
  },

  getPostData: function(marked, postData, type, pathName, data) {
    let r = objectAssign(data, {});
    let datas = postData[type];
    if (datas && datas.length > 0) {
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
    } else {
      return false
    }
  }
}
