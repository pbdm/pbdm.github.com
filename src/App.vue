<script setup lang="ts">
import { ref } from 'vue'
import Post from './Post.vue'


// import './components/post/post.js';
// import './components/nav/nav.js';
// import './components/toc/toc.js';
// import './components/hamburger/hamburger.js';
// // import './components/gitalk/gitalk.js';
 
// const post = document.getElementsByTagName('custom-post')[0];
// const comment = document.getElementsByTagName('custom-comment')[0];
// const toc = document.getElementsByTagName('custom-toc')[0];

const path = ref(window.location.pathname)

const history = window.history as LocalHistory;

history.onpushstate = (params: Array<string>) => {
  onPathChange(params[2]);
};
const pushState = history.pushState;
history.pushState = function() {
  history.onpushstate(arguments);
  // TODO 去除 any
  pushState.apply(history, arguments as unknown as any);
};

// 基本 router
let currentPathname = window.location.pathname;
window.addEventListener('popstate', () => {
  // 防止 hash 跳转触发的渲染
  if (currentPathname !== window.location.pathname) {
    onPathChange(window.location.pathname)
  } else {
    // post.scrollToAnchor();
  }
});

function onPathChange(newPath: string) {
  currentPathname = newPath
  path.value = newPath
}

// // 首次触发
// onPathChange(window.location.pathname)

// post.addEventListener('rendered', () => {
//   toc.contentElement = post.container
//   comment.render();
// })

// toc.addEventListener('hasToc', () => {
//   post.classList.add('has-toc')
// })

// toc.addEventListener('noToc', () => {
//   post.classList.remove('has-toc')
// })

// document.getElementsByTagName('custom-hamburger')[0].addEventListener('click', () => {
//   const toggleClass = 'hide-menu'
//   const body = document.body;
//   if (Array.prototype.indexOf.call(body.classList, toggleClass) !== -1) {
//     body.classList.remove(toggleClass);
//   } else {
//     body.classList.add(toggleClass);
//   }
// })
</script>

<template>
  <Post :path="path"/>
</template>

<style scoped>
html {
  font-family: 'XinGothic', 'Hiragino Sans GB', 'WenQuanYi Micro Hei',
    'Droid Sans', 'Hei SC', 'Microsoft Yahei', sans-serif;
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
}
body {
  margin: 0;
}

custom-nav {
  position: fixed;
  height: 100vh;
  width: 20vw;
  overflow-y: auto;
  transition: transform 250ms ease;
}
custom-nav::-webkit-scrollbar {
  display: none;
}

custom-post {
  display: block;
}

custom-post.has-toc {
  margin-right: 20vw;
}

.hide-menu custom-nav {
  transform: translateX(-22vw); 
}

.container {
  display: block;
  margin-left: 20vw;
  min-height: 100vh;
  transition: margin-left 250ms ease;
  padding: 1rem 3rem;
  box-sizing: border-box;
}

.hide-menu .container {
  margin-left: 0;
}

@media (max-width: 768px) {
  .hide-menu custom-nav {
    transform: translateX(0); 
  }
  custom-nav {
    width: 80vw;
    transform: translateX(-85vw);
  }
  .hide-menu .container {
    transform: translateX(80vw); 
  }
  .container {
    margin-left: 0;
    padding: 1rem;
  }
  custom-toc {
    display: none;
  }
  custom-post.has-toc {
    margin-right: 0;
  }
}
</style>