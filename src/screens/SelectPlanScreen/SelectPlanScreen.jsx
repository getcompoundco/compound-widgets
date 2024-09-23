import styles from "./SelectPlanScreen.scss";
import hourglass from "../../assets/images/hourglass.svg";
import "../../components/Modal/ModalHeader/ModalHeader.jsx";
import "../../components/Modal/ModalFooter/ModalFooter.jsx";

class SelectPlanScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.activePlan = "3 mo";
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="select-plan-screen">
        <modal-header
        current-screen="select-plan"
          header-text="90 Days. AED 39 Earned."
          header-image="${hourglass}"
        ></modal-header>
        <div class="container">
          <div class="content">
            <div class="text-block">
              <h2 class="title">Select your plan</h2>
            </div>
            <div class="input-container">
              <div class="input-wrapper">
                <div class="plan-selector">
                  <button class="plan-button" data-plan="1 mo">
                    1 mo
                  </button>
                  <button class="plan-button active" data-plan="3 mo">
                    3 mo
                  </button>
                  <button class="plan-button" data-plan="6 mo">
                    6 mo
                  </button>
                  <button class="plan-button" data-plan="9 mo">
                    9 mo
                  </button>
                </div>
              </div>
            </div>
            <div class="saving-plan">
              <h3>Your Saving Plan</h3>
              <div class="timeline-heading">
                <div class="timeline-date-heading">Date</div>
                <div class="timeline-deposit-heading">Deposit</div>
                <div class="timeline-rewards-heading">Earnings</div>
              </div>
              <div class="timeline">
                <div class="timeline-line"></div>
                <div class="timeline-item active">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-date">Today</div>
                    <div class="timeline-deposit">AED 100.00</div>
                    <div class="timeline-rewards">AED 20.00</div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-date">20 September</div>
                    <div class="timeline-deposit">AED 100.00</div>
                    <div class="timeline-rewards">AED 20.00</div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-date">20 October</div>
                    <div class="timeline-deposit">AED 100.00</div>
                    <div class="timeline-rewards">AED 20.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <modal-footer
          current-screen="select-plan"
          button-text="Continue"
        ></modal-footer>
        </div>
    `;
  }

  addEventListeners() {
    const planButtons = this.shadowRoot.querySelectorAll(".plan-button");
    planButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.handlePlanSelection(e));
    });

    const footer = this.shadowRoot.querySelector("modal-footer");
    footer.addEventListener("footer-continue", (e) => this.handleContinue(e));
  }

  handlePlanSelection(e) {
    const selectedPlan = e.target.getAttribute("data-plan");
    this.activePlan = selectedPlan;

    const planButtons = this.shadowRoot.querySelectorAll(".plan-button");
    planButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    console.log(`Selected plan: ${this.activePlan}`);
  }

  handleContinue(e) {
    const modal = this.closest("compound-modal");
    if (modal) {
      modal.setAttribute("current-screen", e.detail.screen);
    }
  }
}

customElements.define("select-plan-screen", SelectPlanScreen);
