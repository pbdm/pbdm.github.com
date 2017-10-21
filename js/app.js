import Post from './components/post.js';
import Nav from './components/nav.js';
import { isPromise } from './lib/util.js';

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

class App {
  constructor() {
    this.BEFORE_DESTOY = 'beforeDestroy';
    this.listenList = [];

    this.navElement = document.getElementsByTagName('nav')[0];
    this.mainElement = document.getElementsByTagName('main')[0];

    this.hamburger = document.getElementsByClassName('hamburger')[0];
    this.hamburger.addEventListener('click', () => {
      const toggleClass = 'menu'
      const body = document.body;
      if (body.classList[0] === toggleClass) {
        body.classList.remove(toggleClass);
      } else {
        body.classList.add(toggleClass);
      }
    })

    this.currentPathname = window.location.pathname;

    this.switcher(this.currentPathname);
    window.history.onpushstate = params => {
      this.switcher(params[2]);
    };
    window.addEventListener('popstate', e => {
      // 防止 hash 跳转触发的渲染
      if (this.currentPathname !== window.location.pathname) {
        this.switcher(window.location.pathname);
      }
    });

    this.render(new Nav(), this.navElement);
  }

  renderContainer(page) {
    this.page = page;
    this.mainElement.innerHTML = '';
    this.mainElement.classList.add('loading');
    this.render(page, this.mainElement);
  }

  listen(key, fn) {
    if (!this.listenList[key]) {
      this.listenList[key] = [];
    }
    this.listenList[key].push(fn);
  }

  trigger() {
    const key = Array.prototype.shift.call(arguments);
    const fns = this.listenList[key];
    if (fns && fns.length !== 0) {
      for (let i = 0; i < fns.length; i++) {
        fns[i].apply(this.page, arguments);
      }
      fns.length = 0; // remove all fns once we call it
    }
  }

  render(page, element) {
    const pageValue = page.created();
    if (isPromise(pageValue)) {
      return pageValue.then(data => {
        this.append(element, data);
        this.listen(this.BEFORE_DESTOY, page[this.BEFORE_DESTOY]);
        page.mounted && page.mounted(element);
        return true;
      });
    } else {
      this.append(element, pageValue);
      return true;
    }
  }

  append(element, content) {
    element.innerHTML = content;
    element.classList.remove('loading');
  }

  switcher(path) {
    this.currentPathname = path;
    this.trigger(this.BEFORE_DESTOY);
    path = path.replace('/', '');
    const pathArray = path.split('/');
    pathArray[0] = pathArray[0] || 'home';
    switch (pathArray[0]) {
      case 'home':
        this.renderContainer(new Post('', 'INTRO.md'));
        break;
      default:
        if (pathArray[1]) {
          this.renderContainer(new Post(pathArray[0], pathArray[1]));
        } else {
          this.renderContainer(new Post('', pathArray[0]));
        }
    }
  }
}

new App();
