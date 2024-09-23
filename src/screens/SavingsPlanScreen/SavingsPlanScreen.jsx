import styles from "./SavingsPlanScreen.scss";
import confettiIcon from "../../assets/images/confettiPopper.svg";
import depositAmount from "../../assets/images/depositAmount.svg";
import earnings from "../../assets/images/earnings.svg";
import frequency from "../../assets/images/frequency.svg";
import goalAmount from "../../assets/images/goalAmount.svg";
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
    const endDate = "3rd April, 2024"

    // header-text-custom-styles="padding: 30px 40px 6px"
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="savings-plan-screen">
      <modal-header 
      current-screen="savings-plan"
        header-text="Make Your Savings Interest-Ing."
        subheader-text="Powered By Compound"
        header-image="${confettiIcon}"
        subheader-text-custom-styles="color: #FFFFFF; font-size: 14px; line-height: 24px;"
      ></modal-header>
      <div class="container">
        <div class="content">
          <div class="content-heading">
            <h2 class="content-title">Your Savings Plan</h2>
            <p class="content-sub-title">Ends on <span>${endDate}</span>🎉</p>
          </div>
          <div class="plan-details">
            <div class="detail-item">
              <img class="detail-icon" src="${goalAmount}" alt="Goal Amount"/>
              <span class="detail-label">Goal Amount</span>
              <span class="detail-value">AED 1000.00</span>
            </div>
            <div class="detail-item">
              <img class="detail-icon" src="${frequency}" alt="Frequency"/>
              <span class="detail-label">Frequency</span>
              <span class="detail-value">Every Week</span>
            </div>
            <div class="detail-item">
              <img class="detail-icon" src="${depositAmount}" alt="Deposit Amount"/>
              <span class="detail-label">Deposit Amount</span>
              <span class="detail-value">AED 150.00</span>
            </div>
            <div class="detail-item">
              <img class="detail-icon" src="${earnings}" alt="Earnings"/>
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
      </div>
    `;
  }

  addEventListeners() {
    const footer = this.shadowRoot.querySelector("modal-footer");
    footer.addEventListener("footer-continue", (e) => this.handleContinue(e));
  }

  handleContinue(e) {
    const modal = this.closest("compound-modal");
    if (modal) {
      modal.setAttribute("current-screen", e.detail.screen);
    }
  }
}

customElements.define("savings-plan-screen", SavingsPlanScreen);