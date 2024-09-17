import styles from './WidgetButton.scss';

class WidgetButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') || 'Open Widget';
    const backgroundColor = this.getAttribute('background-color') || '#005eb8';

    const template = `
      <style>${styles}</style>
      <button class="widget-btn" style="background-color: ${backgroundColor};">
        ${label}
      </button>
    `;

    this.shadowRoot.innerHTML = template;
    this.addEventListeners();
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('.widget-btn');
    button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('button-click', { 
        bubbles: true, 
        composed: true 
      }));
    });
  }
}

customElements.define('widget-button', WidgetButton);
