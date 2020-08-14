const fs = require('fs');
const path = require('path');
const MIND = 'http://localhost:22222/mind/index.html?'
const PPT = 'http://localhost:22222/slides.html?'

function walk (option) {
  const { dir, prefix, type } = option;
  let results = [];
  const list = fs.readdirSync(dir)
  list.forEach(function(file) {
    if (file.indexOf('.') !== 0) {
      const item = {};
      // item.name = file
      const curDir= dir + '/' + file
      const stat = fs.statSync(curDir)
      if (stat && stat.isDirectory()) {
        item.path = `http://localhost:22223${type}/${prefix}${file}`
        item.children = walk({
          dir: curDir,
          prefix: path.join(prefix, file) + '/',
          type
        })
      } else {
        item.source = `http://localhost:22222${type}/${prefix}${file}`
        item.blog = `http://localhost:22222${type}/${prefix}${file.replace('md', 'html')}`
        item.mind = `${MIND}http://localhost:22222${type}/${prefix}${file}`
        item.ppt = `${PPT}http://localhost:22222${type}/${prefix}${file}`
      }
      results.push(item);
    }
  })
  return results
}

function getList(type) {
  return walk({
    type,
    dir: path.join(__dirname, type),
    prefix: ''
  })
}

require('http').createServer(function(req, res) {
  const type = req.url
  if (type === '/') {
    res.end('error')
  } else {
    let list;
    try {
      list = getList(decodeURI(type))
    } catch (e) {
  
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(list));
  }
}).listen(22223);