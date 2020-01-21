import { delHtmlTag, getScrollingElement } from '../../lib/util.js';
const template = `
  <link href="/src/components/toc/toc.css" rel="stylesheet">
  <div id="toc"></div>
`

export class Toc extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ 
      mode: "open" 
    });
    this.shadowRoot.innerHTML = template;
    this.listen = this.listen.bind(this);
    this.listenRaf = this.listenRaf.bind(this);
    this.headers = 'h2, h3, h4, h5';
  }

  listenRaf() {
    window.requestAnimationFrame(this.listen);
  }

  connectedCallback() {
    window.addEventListener('scroll', this.listenRaf);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.listenRaf);
  }

  set contentElement(element) {
    this.rootElement = element;
    this.setToc();
  }

  setToc() {
    this.shadowRoot.getElementById('toc').innerHTML = '';
    let childDoms = this.rootElement.querySelectorAll(this.headers);
    if (childDoms && childDoms.length > 0) {
      this.dispatchEvent(new CustomEvent('hasToc') )
      this.tocContent = document.createElement('ul');
      this.tocContent.classList.add('toc');
      const titleDom = document.createElement('span');
      titleDom.classList.add('title');
      titleDom.innerHTML = '文章目录';
      this.tocContent.appendChild(titleDom);
      this.scrollArray = [];
      for (let childDom of childDoms) {
        // recode list position
        this.scrollArray.push(childDom.offsetTop);
        let tempDom = document.createElement('li');
        const name = delHtmlTag(childDom.innerHTML); 
        const inner = `<a href="#${name}">${name}</a>`
        tempDom.innerHTML = inner
        tempDom.classList.add(
          `${childDom.tagName.toLowerCase()}`
        );
        this.tocContent.appendChild(tempDom);
      }
      this.shadowRoot.getElementById('toc').appendChild(this.tocContent);
    } else {
      this.dispatchEvent(new CustomEvent('noToc') ) 
    }
  }

  listen() {
    const tocList = this.tocContent.getElementsByTagName('li');
    const scrollArray = this.scrollArray;
    let top = getScrollingElement().scrollTop + 10;
    scrollArray.forEach((value, i) => {
      if (
        (top > scrollArray[i] && top <= scrollArray[i + 1]) ||
        (i === tocList.length - 1 && top > scrollArray[i]) // for the last one
      ) {
        tocList[i].classList.add('on');
      } else {
        tocList[i].classList.remove('on');
      }
    });
  }

}

window.customElements.define('custom-toc', Toc)
