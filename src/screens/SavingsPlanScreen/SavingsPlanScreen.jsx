import styles from "./SavingsPlanScreen.scss";
import confettiIcon from "../../assets/images/confettiPopper.svg";
import "../../components/Modal/ModalHeader/ModalHeader.jsx";
import "../../components/Modal/ModalFooter/ModalFooter.jsx";

class SavingsPlanScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const endDate = new Date("2024-04-03").toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <modal-header 
        header-text="Make Your Savings Interest-Ing."
        subheader-text="Powered By Compound"
        header-image="${confettiIcon}"
        header-text-custom-styles="padding: 30px 40px 6px"
        subheader-text-custom-styles="color: #FFFFFF; font-size: 14px; line-height: 24px;"
        header-image-custom-styles="position: absolute; top: 105px; left: 220px; width: 170px; height: 170px;"
      ></modal-header>
      <div class="savings-plan-screen">
        <div class="content">
          <h2 class="title">Your Savings Plan</h2>
          <p class="end-date">Ends on ${endDate} 🎉</p>
          <div class="plan-details">
            <div class="detail-item">
              <span class="detail-icon">🎯</span>
              <span class="detail-label">Goal Amount</span>
              <span class="detail-value">AED 1000.00</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🔄</span>
              <span class="detail-label">Frequency</span>
              <span class="detail-value">Every Week</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">💰</span>
              <span class="detail-label">Deposit Amount</span>
              <span class="detail-value">AED 150.00</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🎁</span>
              <span class="detail-label">Earnings</span>
              <span class="detail-value">AED 15.00</span>
            </div>
          </div>
        </div>
      </div>
      <modal-footer 
        current-screen="savings-plan"
        button-text="Make Your First Deposit"
      ></modal-footer>
    `;
  }

  addEventListeners() {
    const footer = this.shadowRoot.querySelector("modal-footer");
    footer.addEventListener("footer-continue", () => this.handleContinue());
  }

  handleContinue() {
    console.log("Make Your First Deposit clicked");
  }
}

customElements.define("savings-plan-screen", SavingsPlanScreen);