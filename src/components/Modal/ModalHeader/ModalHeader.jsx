import styles from "./ModalHeader.scss";
import ikeaLogo from '../../../assets/images/ikea.png';
import compoundLogo from '../../../assets/images/compound.svg';

class ModalHeader extends HTMLElement {
  static get observedAttributes() {
    return ['header-text', 'subheader-text', 'header-image', 'header-text-custom-styles', 'subheader-text-custom-styles', 'header-image-custom-styles', 'current-screen'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.backButtonClickHandler = this.handleBack.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.addEventListeners();
    }
  }

  render() {
    const headerText = this.getAttribute('header-text');
    const subheaderText = this.getAttribute('subheader-text');
    const headerImage = this.getAttribute('header-image');
    const headerTextCustomStyles = this.getAttribute('header-text-custom-styles');
    const subheaderTextCustomStyles = this.getAttribute('subheader-text-custom-styles');
    const headerImageCustomStyles = this.getAttribute('header-image-custom-styles');
    const currentScreen = this.getAttribute("current-screen");

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="header">
      <div class="back-button">
      ${
        currentScreen !== "explainer"
          ? `<img width="25" height="21" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-left.png" alt="chevron-left" />`
          : ''
      }
    </div>
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

  addEventListeners() {
    const backButton = this.shadowRoot.querySelector(".back-button");
    if (backButton) {
      backButton.addEventListener("click", this.backButtonClickHandler);
    }
  }

  removeEventListeners() {
    const backButton = this.shadowRoot.querySelector(".back-button");
    if (backButton) {
      backButton.removeEventListener("click", this.backButtonClickHandler);
    }
  }

  handleBack() {
    const currentScreen = this.getAttribute("current-screen");
    const previousScreen = this.getPreviousScreen(currentScreen);

    this.dispatchEvent(
      new CustomEvent("header-back", {
        bubbles: true,
        composed: true,
        detail: { screen: previousScreen },
      })
    );
  }

  getPreviousScreen(currentScreen) {
    switch (currentScreen) {
      case "select-plan":
        return "savings-goal";
      case "create-account":
        return "select-plan";
      case "savings-plan":
        return "create-account";
      default:
        return "explainer";
    }
  }
}

customElements.define("modal-header", ModalHeader);
