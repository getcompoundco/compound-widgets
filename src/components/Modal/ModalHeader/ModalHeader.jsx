import styles from "./ModalHeader.scss";
import ikeaLogo from '../../../assets/images/ikea.png';
import compoundLogo from '../../../assets/images/compound.svg';

class ModalHeader extends HTMLElement {
  static get observedAttributes() {
    return ['header-text', 'subheader-text', 'header-image', 'header-text-custom-styles', 'subheader-text-custom-styles', 'header-image-custom-styles'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const headerText = this.getAttribute('header-text');
    const subheaderText = this.getAttribute('subheader-text');
    const headerImage = this.getAttribute('header-image');
    const headerTextCustomStyles = this.getAttribute('header-text-custom-styles');
    const subheaderTextCustomStyles = this.getAttribute('subheader-text-custom-styles');
    const headerImageCustomStyles = this.getAttribute('header-image-custom-styles');

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="header">
        <div class="header-logos">
          <img src="${ikeaLogo}" alt="IKEA Logo" class="logo ikea" />
          <span class="divider">x</span>
          <img src="${compoundLogo}" alt="Compound Logo" class="logo compound" />
        </div>
        ${headerText ? `<div class="header-text" style="${headerTextCustomStyles || ''}">${headerText}</div>` : ''}
        ${subheaderText ? `<div class="subheader-text" style="${subheaderTextCustomStyles || ''}">${subheaderText}</div>` : ''}
        ${headerImage ? `<img src="${headerImage}" alt="Header Image" class="header-image" style="${headerImageCustomStyles || ''}"/>` : ''}
      </div>
    `;
  }
}

customElements.define('modal-header', ModalHeader);