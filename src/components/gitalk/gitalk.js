const template = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
  <div id="gitalk-container"></div>
`


export class Comment extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ 
      mode: "open" 
    });
    this.shadowRoot.innerHTML = template;
    this.render();
  }

  render() {
    let id = window.location.pathname;
    if (id === '/') {
      id = '/INTRO.md';
    }
    const gitalk = new Gitalk({
      clientID: '9ff28fdcfa8dee48ec3b',
      clientSecret: '4dc116a4a8999d27258013f0b29af3ae902d199a',
      repo: 'comment',
      owner: 'pbdm',
      admin: ['pbdm'],
      id,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    
    gitalk.render(this.shadowRoot.getElementById('gitalk-container'))

  }

}

window.customElements.define('custom-comment', Comment)
