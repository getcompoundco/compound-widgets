import '../../../screens/ExplainerScreen/ExplainerScreen.jsx';
import '../../../screens/SavingsGoalScreen/SavingsGoalScreen.jsx';
import '../../../screens/SavingsPlanScreen/SavingsPlanScreen.jsx';
import '../../../screens/SelectPlanScreen/SelectPlanScreen.jsx';
import '../../../screens/CreateAccountScreen/CreateAccountScreen.jsx';
import '../../../screens/OtpValidationScreen/OtpValidationScreen.jsx';
import styles from "./ModalContent.scss";

class ModalContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['current-screen'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'current-screen' && oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const currentScreen = this.getAttribute('current-screen') || 'explainer';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="modal-content">
        ${this.getScreenComponent(currentScreen)}
      </div>
    `;
  }

  getScreenComponent(screen) {
    switch(screen) {
      case 'savings-goal':
        return '<savings-goal-screen></savings-goal-screen>';
      case 'select-plan':
        return '<select-plan-screen></select-plan-screen>';
      case 'create-account':
        return '<create-account-screen></create-account-screen>';
      case 'savings-plan':
        return '<savings-plan-screen></savings-plan-screen>';
      case 'otp-validation':
        return '<otp-validation-screen></otp-validation-screen>';
      default:
        return '<explainer-screen></explainer-screen>';
    }
  }
}

customElements.define('modal-content', ModalContent);