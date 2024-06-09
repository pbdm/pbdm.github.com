import demoMakdown from '../mock/markdown.md?raw';
import { parseData } from './markdown.ts'

export async function renderPosts(path: string) {
  let content
  if (import.meta.env.DEV) {
    content = demoMakdown
  } else {
    // content = await fetchPostDetail(path);
  }
  return parseData(content)
}

/*
async function fetchPostDetail(path: string) {
  let link;
  if (this.renderPath.indexOf('/others') === 0 ) {
    link = this.renderPath
  } else {  
    link = `/posts${this.renderPath}` 
  }
  const data = await get(link);
  if (data.indexOf('<!DOCTYPE html>') === 0) {
    return '404';
  } else {
    if (data.indexOf('name') === 0) {
      return {
        content: '',
        frontMatter: ''
      };
    } else {
      return markdown(data);
    }
  }
}

export function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

export async function get(url, type) {
  let response = await fetch(url);
  if (type === 'json') {
    return await response.json();
  } else {
    return await response.text();
  }
}

export function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

// thanks to https://gist.github.com/dperini/ac3d921d6a08f10fd10e
// TODO use document.scrollingElement?
// https://github.com/mathiasbynens/document.scrollingElement
export function getScrollingElement() {
  return window.document.scrollingElement
  // let d = document;
  // return d.documentElement.scrollHeight > d.body.scrollHeight &&
  //   d.compatMode.indexOf('CSS1') === 0 ?
  //   d.documentElement :
  //   d.body;
}

export function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g,"");
}

function getSingle(fn) {
  const result = {};
  return function() {
    const key = Array.prototype.join.call(arguments);
    if (!result[key]) {
      result[key] = fn.apply(this, arguments);
    }
    return result[key];
  }
}

// TODO add more attribute support
function loadjscssfile(filename, filetype) {
  filetype = filetype || filename.split('.').pop();
	return new Promise((resolve, reject) => {
    let fileref;
    if (filetype === "js") {
      fileref = document.createElement('script')
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", filename);
    } else if (filetype === "css") {
      fileref = document.createElement("link")
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    fileref.onload = resolve;
    fileref.onerror = reject;
    document.getElementsByTagName("head")[0].appendChild(fileref)
  })
}

const loadFileOnce = getSingle(loadjscssfile);

export function loadFile(filename, filetype, once) {
  arguments.length = arguments.length - 1;
  if (once) {
    return loadFileOnce.apply(this, arguments);
  } else {
    return loadjscssfile.apply(this, arguments);
  }
}
*/
