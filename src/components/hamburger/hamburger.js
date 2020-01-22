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
    // safari mobile 里不能用 this.shadowRoot.addEventlistener...
  }

}

window.customElements.define('custom-hamburger', Hamburger)
