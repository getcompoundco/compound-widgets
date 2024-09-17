import styles from "./SavingsGoalScreen.scss";
import jarWithDollar from "../../assets/images/jarWithDollar.svg";
import goldAndSilverCoins from "../../assets/images/goldAndSilverCoins.svg";
import "../../components/Modal/ModalHeader/ModalHeader.jsx";
import "../../components/Modal/ModalFooter/ModalFooter.jsx";

class SavingsGoalScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.savingsAmount = "";
    this.thresholdAmount = 100;
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
        <modal-header
          header-text="Earn 20% on Every Deposit"
          header-image="${goldAndSilverCoins}"
        ></modal-header>
        <div class="savings-goal-screen">
          <div class="content">
            <div class="text-block">
              <h2 class="title">How much are you thinking of saving?</h2>
            </div>
            <div class="input-container">
              <div class="input-wrapper">
                <img
                  src="${jarWithDollar}"
                  alt="Jar with Dollar"
                  class="jar-logo"
                />

                <input
                  type="text"
                  id="savings-amount"
                  value="${this.formatNumber(
                  this.savingsAmount
                )}"
                  inputmode="numeric"
                  aria-label="Enter savings amount"
                  placeholder=""
                />
                <span class="currency-symbol">AED</span>
              </div>
              <p class="error-message" aria-live="polite"></p>
            </div>
          </div>
        </div>
        <modal-footer
          current-screen="savings-goal"
          button-disabled
          button-text="Continue"
        ></modal-footer>
    `;
  }

  addEventListeners() {
    this.input = this.shadowRoot.querySelector("#savings-amount");
    this.footer = this.shadowRoot.querySelector("modal-footer");

    this.inputHandler = (e) => this.handleInput(e);
    this.blurHandler = () => this.handleBlur();
    this.continueHandler = (e) => this.handleContinue(e);

    this.input.addEventListener("input", this.inputHandler);
    this.input.addEventListener("blur", this.blurHandler);
    this.footer.addEventListener("footer-continue", this.continueHandler);
  }

  removeEventListeners() {
    this.input.removeEventListener("input", this.inputHandler);
    this.input.removeEventListener("blur", this.blurHandler);
    this.footer.removeEventListener("footer-continue", this.continueHandler);
  }

  focusInput() {
    this.input.focus();
  }

  handleInput(e) {
    let value = e.target.value.replace(/[^\d]/g, "");
    const integerPart = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    e.target.value = integerPart;

    this.savingsAmount = value ? parseInt(value.replace(/,/g, "")) : "";
    this.updateButtonState();
    this.clearErrorState();
  }

  handleBlur() {
    this.input.value = this.savingsAmount
      ? this.formatNumber(this.savingsAmount)
      : "";
  }

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handleContinue(e) {
    if (!this.validateAmount()) {
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
  }

  validateAmount() {
    return (
      this.savingsAmount !== "" &&
      parseInt(this.savingsAmount) >= this.thresholdAmount
    );
  }

  updateButtonState() {
    if (this.savingsAmount !== "") {
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
    if (this.savingsAmount === "") {
      return "Please enter a savings amount";
    } else if (parseInt(this.savingsAmount) < this.thresholdAmount) {
      return `Amount cannot be less than AED ${this.formatNumber(
        this.thresholdAmount
      )}`;
    } else {
      return "Something went wrong";
    }
  }
}

customElements.define("savings-goal-screen", SavingsGoalScreen);
