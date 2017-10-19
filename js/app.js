import Post from './components/post.js';
// import NotFound from './components/404.js';
import Nav from './components/nav.js';
import { isPromise } from './lib/util.js';

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
    const rootElement = document.getElementById('app');
    this.navElement = document.createElement('nav');
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('container');
    rootElement.appendChild(this.navElement);
    rootElement.appendChild(this.containerElement);
    this.switcher(window.location.pathname);
    window.history.onpushstate = params => {
      this.switcher(params[2]);
    };
    window.addEventListener('popstate', e => {
      this.switcher(window.location.pathname);
    });
    this.renderNav();
  }

  renderNav() {
    this.render(new Nav(), this.navElement);
  }

  renderContainer(page) {
    this.page = page;
    this.clean();
    this.render(page, this.containerElement);
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

  clean() {
    this.containerElement.innerHTML = '';
    this.containerElement.classList.add('loading');
  }

  append(element, content) {
    element.innerHTML = content;
    element.classList.remove('loading');
  }

  switcher(path) {
    this.trigger(this.BEFORE_DESTOY);
    path = path.replace('/', '');
    let pathArray = path.split('/');
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
