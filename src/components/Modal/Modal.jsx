import "./ModalContent/ModalContent.jsx";
import styles from "./Modal.scss";

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._handleModalClick = this._handleModalClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
  }

  static get observedAttributes() {
    return ["current-screen", "open"];
  }

  get currentScreen() {
    return this.getAttribute("current-screen") || "explainer";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "current-screen" && oldValue !== newValue) {
      this.updateContent();
    } else if (name === "open") {
      this.toggleModal(newValue !== null);
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  toggleModal(isOpen) {
    this.shadowRoot.querySelector(".modal").classList.toggle("show", isOpen);
  }

  closeModal() {
    this.removeAttribute("open");
    this.setAttribute("current-screen", "explainer");
    this.dispatchEvent(
      new CustomEvent("modal-close", {
        bubbles: true,
        composed: true,
        detail: { resetScreen: true },
      })
    );
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${styles}</style>
      <div class="modal">
        <div class="modal-content">
          <span class="close" id="closeBtn">&times;</span>
          <div class="slide-container">
            <modal-content current-screen="${this.currentScreen}"></modal-content>
          </div>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.updateContent();
  }

  addEventListeners() {
    this.shadowRoot.querySelector(".modal").addEventListener("click", this._handleModalClick);
    this.shadowRoot.querySelector("#closeBtn").addEventListener("click", this._handleCloseClick);
  }

  removeEventListeners() {
    this.shadowRoot.querySelector(".modal").removeEventListener("click", this._handleModalClick);
    this.shadowRoot.querySelector("#closeBtn").removeEventListener("click", this._handleCloseClick);
  }

  _handleModalClick(event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  _handleCloseClick() {
    this.closeModal();
  }

  updateContent() {
    const modalContent = this.shadowRoot.querySelector("modal-content");
    if (modalContent) {
      modalContent.setAttribute("current-screen", this.currentScreen);
    }
  }
}

customElements.define("compound-modal", Modal);