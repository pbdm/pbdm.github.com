if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
  });
}
import './components/post/post.js';
import './components/nav/nav.js';
import './components/toc/toc.js';
import './components/hamburger/hamburger.js';
import './components/gitalk/gitalk.js';
 
const post = document.getElementsByTagName('custom-post')[0];
const comment = document.getElementsByTagName('custom-comment')[0];
const toc = document.getElementsByTagName('custom-toc')[0];

// add history.onpushstate listener
(function(history) {
  var pushState = history.pushState;
  history.pushState = function() {
    if (typeof history.onpushstate === 'function') {
      history.onpushstate(arguments);
    }
    return pushState.apply(history, arguments);
  };
})(window.history);

// 基本 router
let currentPathname = window.location.pathname;
window.history.onpushstate = params => {
  onPathChange(params[2]);
};
window.addEventListener('popstate', e => {
  // 防止 hash 跳转触发的渲染
  if (currentPathname !== window.location.pathname) {
    onPathChange(window.location.pathname)
  } else {
    post.scrollToAnchor();
  }
});

function onPathChange(newPath) {
  currentPathname = newPath
  post.path = newPath
  toc.path = newPath
}

// 首次触发
onPathChange(window.location.pathname)

post.addEventListener('rendered', () => {
  toc.contentElement = post.container
  comment.render();
})

toc.addEventListener('hasToc', () => {
  post.classList.add('has-toc')
})

toc.addEventListener('noToc', () => {
  post.classList.remove('has-toc')
})

document.getElementsByTagName('custom-hamburger')[0].addEventListener('click', () => {
  const toggleClass = 'hide-menu'
  const body = document.body;
  if (Array.prototype.indexOf.call(body.classList, toggleClass) !== -1) {
    body.classList.remove(toggleClass);
  } else {
    body.classList.add(toggleClass);
  }
})


