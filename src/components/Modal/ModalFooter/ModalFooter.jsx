import styles from "./ModalFooter.scss";

class ModalFooter extends HTMLElement {
  static get observedAttributes() {
    return ["current-screen", "button-disabled", "button-text"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.buttonClickHandler = this.handleContinue.bind(this);
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
      if (name === "button-disabled") {
        this.updateButtonState(this.hasAttribute("button-disabled"));
      } else if (name === "current-screen") {
        this.updateButtonText();
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="modal-footer">
        <button class="continue-btn">${this.getButtonText()}</button>
      </div>
    `;
    this.updateButtonState(this.hasAttribute("button-disabled"));
  }

  addEventListeners() {
    const continueBtn = this.shadowRoot.querySelector(".continue-btn");
    continueBtn.addEventListener("click", this.buttonClickHandler);
  }

  removeEventListeners() {
    const continueBtn = this.shadowRoot.querySelector(".continue-btn");
    if (continueBtn) {
      continueBtn.removeEventListener("click", this.buttonClickHandler);
    }
  }

  handleContinue() {
    if (!this.hasAttribute("button-disabled")) {
      this.dispatchEvent(
        new CustomEvent("footer-continue", {
          bubbles: true,
          composed: true,
          detail: { screen: this.getNextScreen() },
        })
      );
    }
  }

  getButtonText() {
    const buttonText = this.getAttribute("button-text");
    if (buttonText) {
      return buttonText;
    }
  }

  updateButtonText() {
    const continueBtn = this.shadowRoot.querySelector(".continue-btn");
    if (continueBtn) {
      continueBtn.textContent = this.getButtonText();
    }
  }

  getNextScreen() {
    const currentScreen = this.getAttribute("current-screen");
    switch (currentScreen) {
      case "explainer":
        return "savings-goal";
      case "savings-goal":
        return "select-plan";
      case "select-plan":
        return "create-account";
      case "create-account":
        return "savings-plan";
      case "savings-plan":
        return "explainer";
      default:
        return "explainer";
    }
  }

  updateButtonState(isDisabled) {
    const continueBtn = this.shadowRoot.querySelector(".continue-btn");
    if (continueBtn) {
      if (isDisabled) {
        continueBtn.setAttribute("disabled", "");
      } else {
        continueBtn.removeAttribute("disabled");
      }
    }
  }
}

customElements.define("modal-footer", ModalFooter);
