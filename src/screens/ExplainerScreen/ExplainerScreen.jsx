import styles from "./ExplainerScreen.scss";
import cashWallet from "../../assets/images/cashWallet.svg";
import dollarSign from "../../assets/images/dollarSign.svg";
import miniFlamingo from "../../assets/images/miniFlamingo.svg";
import navLeft from "../../assets/images/navLeft.png";
import navRight from "../../assets/images/navRight.png";
import "../../components/Modal/ModalHeader/ModalHeader.jsx";
import "../../components/Modal/ModalFooter/ModalFooter.jsx";

class ExplainerScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.content = [
      {
        title: "How it works",
        description: "Save with your favorite brand. Earn on every deposit. Spend when you're ready.",
        image: `${cashWallet}`
      },
      {
        title: "Earning Rewards",
        description: "Deposit any amount once a month to keep earning 12 times more compared to a regular savings account.",
        image: `${dollarSign}`
      },
      {
        title: "Keeping you afloat & safe",
        description: "Your savings are safe, even if the financial markets fail.",
        image: `${miniFlamingo}`
      }
    ];
    this.autoRotateInterval = null;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.startAutoRotate();
  }

  disconnectedCallback() {
    this.removeEventListeners();
    this.stopAutoRotate();
  }

  render() {
    const styles = `
      ${this.getStyles()}
      @media (max-width: 768px) {
        .carousel-btn {
          display: none;
        }
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="explainer-screen">
      <modal-header current-screen="explainer"></modal-header>
      <div class="container">
      <div class="body">
      <div class="content">
      <div class="content-para"></div>
      <div class="carousel-content">
      <div class="carousel" aria-roledescription="carousel" aria-label="Explainer content">
      <button class="carousel-btn left" aria-label="Previous">
      <img src="${navLeft}" alt="Left Button" />
      </button>
      <div class="carousel-images"></div>
      <button class="carousel-btn right" aria-label="Next">
      <img src="${navRight}" alt="Right Button" />
      </button>
      </div>
      <div class="indicators"></div>
      </div>
      </div>
      </div>
      </div>
      <modal-footer current-screen="explainer" button-text="Continue"></modal-footer>
      </div>
    `;

    this.updateCarousel();
  }

  getStyles() {
    return styles;
  }

  updateCarousel() {
    const contentPara = this.shadowRoot.querySelector('.content-para');
    const carouselImages = this.shadowRoot.querySelector('.carousel-images');
    const indicators = this.shadowRoot.querySelector('.indicators');

    contentPara.innerHTML = this.content.map((item, index) => `
      <div class="text ${index === this.currentIndex ? 'active' : ''}" aria-hidden="${index !== this.currentIndex}">
        <h2 class="content-title">${item.title}</h2>
        <p class="content-desc">${item.description}</p>
      </div>
    `).join('');

    carouselImages.innerHTML = this.content.map((item, index) => `
      <img src="${item.image}" alt="${item.title}" class="carousel-image ${index === this.currentIndex ? 'active' : ''}"
           role="group" aria-roledescription="slide" aria-label="${index + 1} of ${this.content.length}"
           aria-hidden="${index !== this.currentIndex}" />
    `).join('');

    indicators.innerHTML = this.content.map((_, index) => `
      <span class="indicator ${index === this.currentIndex ? 'active' : ''}" data-index="${index}"
            role="button" aria-label="Go to slide ${index + 1}" tabindex="0"></span>
    `).join('');
  }

  addEventListeners() {
    this.leftButton = this.shadowRoot.querySelector('.carousel-btn.left');
    this.rightButton = this.shadowRoot.querySelector('.carousel-btn.right');
    this.indicators = this.shadowRoot.querySelectorAll('.indicator');
    this.footer = this.shadowRoot.querySelector('modal-footer');

    this.leftButton.addEventListener('click', this.navigateLeft);
    this.rightButton.addEventListener('click', this.navigateRight);
    this.indicators.forEach(indicator => {
      indicator.addEventListener('click', this.handleIndicatorClick);
      indicator.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.handleIndicatorClick(e);
        }
      });
    });
    this.footer.addEventListener('footer-continue', this.handleContinue);

    this.shadowRoot.addEventListener('mouseover', this.stopAutoRotate);
    this.shadowRoot.addEventListener('mouseout', this.startAutoRotate);
  }

  removeEventListeners() {
    this.leftButton.removeEventListener('click', this.navigateLeft);
    this.rightButton.removeEventListener('click', this.navigateRight);
    this.indicators.forEach(indicator => {
      indicator.removeEventListener('click', this.handleIndicatorClick);
      indicator.removeEventListener('keypress', this.handleIndicatorClick);
    });
    this.footer.removeEventListener('footer-continue', this.handleContinue);

    this.shadowRoot.removeEventListener('mouseover', this.stopAutoRotate);
    this.shadowRoot.removeEventListener('mouseout', this.startAutoRotate);
  }

  navigateLeft = () => {
    this.navigate(-1);
    this.resetAutoRotate();
  };

  navigateRight = () => {
    this.navigate(1);
    this.resetAutoRotate();
  };

  handleIndicatorClick = (e) => {
    this.currentIndex = parseInt(e.target.getAttribute('data-index'));
    this.updateCarousel();
    this.resetAutoRotate();
  };

  handleContinue = (e) => {
    const modal = this.closest('compound-modal');
    if (modal) {
      modal.setAttribute('current-screen', e.detail.screen);
    }
  };

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + this.content.length) % this.content.length;
    this.updateCarousel();
  }

  startAutoRotate = () => {
    if (!this.autoRotateInterval) {
      this.autoRotateInterval = setInterval(() => {
        this.navigate(1);
      }, 5000);
    }
  };

  stopAutoRotate = () => {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  };

  resetAutoRotate = () => {
    this.stopAutoRotate();
    this.startAutoRotate();
  };
}

customElements.define('explainer-screen', ExplainerScreen);