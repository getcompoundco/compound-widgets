import styles from "./OtpValidationScreen.scss";
import earningsSavings from "../../assets/images/earningsSavings.svg";
import "../../components/Modal/ModalHeader/ModalHeader.jsx";
import "../../components/Modal/ModalFooter/ModalFooter.jsx";

class OtpValidationScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.timeLeft = 60; 
  }

  connectedCallback() {
    this.render();
    this.footer = this.shadowRoot.querySelector("modal-footer");
    this.inputs = this.shadowRoot.querySelectorAll(".otp-input");
    this.resendLink = this.shadowRoot.querySelector(".resend");
    this.resendContainer = this.shadowRoot.querySelector(".resend-container");
    this.addEventListeners();
    this.updateContinueButtonState();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="otp-validation-screen">
        <div class="otp-screen-header-container">
          <modal-header current-screen="otp-validation" header-text="All that you deserve. And some more." header-image="${earningsSavings}" header-image-custom-styles="width: 256px"></modal-header>
        </div>
        <div class="container">
          <div class="content">
            <div class="text-block">
              <h2 class="title">Verify Your Phone</h2>
              <div class="subtitle">We've sent a code to +1 4445 55 55.</div>
            </div>
            <div class="otp-container">
            <input type="text" class="otp-input" />
            <input type="text" class="otp-input" />
            <input type="text" class="otp-input" />
            <input type="text" class="otp-input" />
          </div>
          <div class="timer">00:59</div>
          <div class="resend-container">Did not receive yet? <a class="resend">Resend OTP</a></div>
            </div>
          </div>
        <modal-footer current-screen="otp-validation" button-disabled button-text="Continue"></modal-footer>
        </div>
    `;
  }

  addEventListeners() {
    this.footer.addEventListener("footer-continue", (e) => this.handleContinue(e));
    this.inputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        this.handleInput(e, index);
        this.updateContinueButtonState();
      });
      input.addEventListener("keydown", (e) => this.handleKeydown(e, index));
    });

    this.resendLink.addEventListener("click", () => this.resendOTP());
    this.startTimer();
  }

  handleContinue(e) {
    const modal = this.closest("compound-modal");
    if (modal) {
      modal.setAttribute("current-screen", e.detail.screen);
    }
  }

  updateContinueButtonState() {
    const isComplete = Array.from(this.inputs).every(
      (input) => input.value.length === 1
    );

    if (isComplete) {
      this.footer.removeAttribute("button-disabled");
    } else {
      this.footer.setAttribute("button-disabled", "");
    }
  }

  handleInput(e, index) {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "").slice(0, 1);
    e.target.value = value;

    if (value.length === 1 && index < this.inputs.length - 1) {
      this.inputs[index + 1].focus();
    }
  }

  handleKeydown(e, index) {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      this.inputs[index - 1].focus();
    }
  }

  getTimeInMinuteSecond(time) {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return [minutes, seconds];
  }

  updateTimer = () => {
    const timerElement = this.shadowRoot.querySelector(".timer");
    const [minutes, seconds] = this.getTimeInMinuteSecond(this.timeLeft);
    timerElement.textContent = `${minutes}:${seconds}`;

    if (this.timeLeft === 0) {
      clearInterval(this.timerInterval);
      this.resendLink.classList.add("active");
      this.resendContainer.classList.add("active");
    } else {
      this.timeLeft--;
    }
  };

  startTimer() {
    this.resendLink.classList.remove("active");
    this.resendContainer.classList.remove("active");

    this.updateTimer();
    this.timerInterval = setInterval(this.updateTimer, 1000);
  }

  resendOTP() {
    if (this.resendLink.classList.contains("active")) {
      this.inputs.forEach((input) => (input.value = ""));
      this.inputs[0].focus();

      this.resendLink.classList.remove("active");
      this.resendContainer.classList.remove("active");

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timeLeft = 60;
      this.startTimer();
    }
  }
}

customElements.define("otp-validation-screen", OtpValidationScreen);
