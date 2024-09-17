import './components/WidgetButton/WidgetButton.jsx';
import './components/Modal/Modal.jsx';
import styles from './Widget.scss';

class CompoundWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentScreen = 'explainer';
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const buttonLabel = this.getAttribute('button-label') || 'Open Widget';
    const buttonColor = this.getAttribute('button-color') || '#005eb8';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="compound-widget">
        <widget-button label="${buttonLabel}" color="${buttonColor}"></widget-button>
        <compound-modal current-screen="${this.currentScreen}"></compound-modal>
      </div>
    `;
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('widget-button');
    const modal = this.shadowRoot.querySelector('compound-modal');

    button.addEventListener('button-click', () => {
      modal.setAttribute('open', '');
    });

    modal.addEventListener('modal-close', () => {
      modal.removeAttribute('open');
    });

    modal.addEventListener('footer-continue', (e) => {
      modal.setAttribute('current-screen', e.detail.screen);
    });
  }
}

customElements.define('compound-widget', CompoundWidget);