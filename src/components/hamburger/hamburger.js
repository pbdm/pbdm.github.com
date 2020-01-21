const template = `
  <link href="/src/components/hamburger/hamburger.css" rel="stylesheet">
  <div id='hamburger'></div>
`

export class Hamburger extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ 
      mode: "open" 
    });
    this.shadowRoot.innerHTML = template;
    this.shadowRoot.addEventListener('click', () => {
      const toggleClass = 'show-menu'
      const body = document.body;
      if (Array.prototype.indexOf.call(body.classList, toggleClass) !== -1) {
        body.classList.remove(toggleClass);
      } else {
        body.classList.add(toggleClass);
      }
    })
  }

}

window.customElements.define('custom-hamburger', Hamburger)
