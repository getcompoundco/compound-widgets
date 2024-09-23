import styles from "./CreateAccountScreen.scss";
import mobileNotification from "../../assets/images/mobileNotification.svg";
import "../../components/Modal/ModalHeader/ModalHeader.jsx";
import "../../components/Modal/ModalFooter/ModalFooter.jsx";

class CreateAccountScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.phoneNumber = "";
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.focusInput();
    this.updateButtonState();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="create-account-screen">
      <modal-header current-screen="create-account" header-text="Do more with your Savings. Earn 12%." header-image="${mobileNotification}"></modal-header>
      <div class="container">
        <div class="content">
          <div class="text-block">
            <h2 class="title">Create Your Account</h2>
          </div>
          <div class="subtitle">phone number</div>
          <div class="input-container">
            <div class="input-wrapper">
              <select id="country-code" class="country-code">
                <option value="+1" selected>🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>
              <div class="divider"></div>
              <input type="tel" id="phone" placeholder="(555) 000-0000" value="${this.phoneNumber}">
            </div>
            <p class="error-message" aria-live="polite"></p>
          </div>
        </div>
      </div>
      <modal-footer current-screen="create-account" button-disabled button-text="Continue"></modal-footer>
      </div>
    `;

    this.updateElements();
  }

  updateElements() {
    this.input = this.shadowRoot.getElementById("phone");
    this.footer = this.shadowRoot.querySelector("modal-footer");
    this.countryCode = this.shadowRoot.querySelector("country-code");
  }

  addEventListeners() {
    this.input.addEventListener("input", this.handleInput);
    this.input.addEventListener("blur", this.handleBlur);
    this.footer.addEventListener("footer-continue", this.handleContinue);
  }

  removeEventListeners() {
    this.input.removeEventListener("input", this.handleInput);
    this.input.removeEventListener("blur", this.handleBlur);
    this.footer.removeEventListener("footer-continue", this.handleContinue);
  }

  focusInput() {
    this.input.focus();
  }

  handleInput = (e) => {
    this.formatPhoneNumber(e.target);
    this.phoneNumber = e.target.value;
    this.updateButtonState();
    this.clearErrorState();
  };

  handleBlur = () => {
    this.input.value = this.phoneNumber;
  };

  formatPhoneNumber(input) {
    const digitsOnly = input.value.replace(/\D/g, "");
    let formattedNumber = "";

    if (digitsOnly.length > 0) {
      formattedNumber += "(" + digitsOnly.slice(0, 3);

      if (digitsOnly.length > 3) {
        formattedNumber += ") " + digitsOnly.slice(3, 6);

        if (digitsOnly.length > 6) {
          formattedNumber += "-" + digitsOnly.slice(6, 10);
        }
      }
    }

    input.value = formattedNumber;
    this.phoneNumber = formattedNumber;
  }

  handleContinue = (e) => {
    if (!this.validatePhoneNumber()) {
      e.preventDefault();
      e.stopPropagation();
      this.showErrorState();
    } else {
      this.clearErrorState();
      const modal = this.closest("compound-modal");
      if (modal) {
        modal.setAttribute("current-screen", e.detail.screen);
      }
    }
  };

  validatePhoneNumber() {
    const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phonePattern.test(this.phoneNumber);
  }

  updateButtonState() {
    if (this.phoneNumber) {
      this.footer.removeAttribute("button-disabled");
    } else {
      this.footer.setAttribute("button-disabled", "");
    }
  }

  showErrorState() {
    const inputWrapper = this.shadowRoot.querySelector(".input-wrapper");
    const errorMessage = this.shadowRoot.querySelector(".error-message");
    inputWrapper.classList.add("error");
    errorMessage.textContent = this.getErrorMessage();
    errorMessage.style.display = "block";
  }

  clearErrorState() {
    const inputWrapper = this.shadowRoot.querySelector(".input-wrapper");
    const errorMessage = this.shadowRoot.querySelector(".error-message");
    inputWrapper.classList.remove("error");
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }

  getErrorMessage() {
    if (!this.phoneNumber) {
      return "Please enter a phone number";
    } else if (!this.validatePhoneNumber()) {
      return "Please enter a valid phone number";
    } else {
      return "Something went wrong";
    }
  }
}

customElements.define("create-account-screen", CreateAccountScreen);
