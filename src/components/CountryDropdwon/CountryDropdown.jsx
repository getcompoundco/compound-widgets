import styles from './CountryDropdown.scss';

class CountryDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.countries = [
      { code: '+973', name: 'Bahrain', nativeName: 'البحرين', flag: '🇧🇭' },
      { code: '+965', name: 'Kuwait', nativeName: 'الكويت', flag: '🇰🇼' },
      { code: '+968', name: 'Oman', nativeName: 'عمان', flag: '🇴🇲' },
      { code: '+974', name: 'Qatar', nativeName: 'قطر', flag: '🇶🇦' },
      { code: '+966', name: 'Saudi Arabia', nativeName: 'المملكة العربية السعودية', flag: '🇸🇦' },
      { code: '+971', name: 'United Arab Emirates', nativeName: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
    ];
    this.isOpen = false;
  }

  connectedCallback() {
    this.initializeSelectedCountry();
    this.render();
    this.addEventListeners();
  }

  initializeSelectedCountry() {
    const selectedCountryAttr = this.getAttribute('selectedCountry');
    if (selectedCountryAttr) {
      try {
        const parsedCountry = JSON.parse(selectedCountryAttr);
        this.selectedCountry = this.countries.find(c => c.code === parsedCountry.code) || this.countries[0];
      } catch (e) {
        console.error('Invalid selectedCountry attribute:', e);
        this.selectedCountry = this.countries[0];
      }
    } else {
      this.selectedCountry = this.countries[0];
    }
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  addEventListeners() {
    this.shadowRoot.querySelector('.selected-country').addEventListener('click', this.toggleDropdown.bind(this));
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  removeEventListeners() {
    this.shadowRoot.querySelector('.selected-country').removeEventListener('click', this.toggleDropdown.bind(this));
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
    this.updateDropdown();
  }

  handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this.isOpen = false;
      this.updateDropdown();
    }
  }

  selectCountry(country) {
    this.selectedCountry = country;
    this.isOpen = false;
    this.updateSelectedCountry();
    this.updateDropdown();
    this.dispatchEvent(new CustomEvent('country-select', { detail: this.selectedCountry }));
  }

  updateSelectedCountry() {
    const selectedCountryElement = this.shadowRoot.querySelector('.selected-country');
    selectedCountryElement.innerHTML = `
      <span>${this.selectedCountry.flag}</span>
      <span>${this.selectedCountry.code}</span>
      ${this.getArrowSvg()}
    `;
  }

  updateDropdown() {
    const dropdown = this.shadowRoot.querySelector('.country-list');
    if (this.isOpen) {
      if (!dropdown) {
        this.renderDropdown();
      } else {
        dropdown.style.display = 'block';
      }
    } else if (dropdown) {
      dropdown.style.display = 'none';
    }
    this.updateArrow();
  }

  updateArrow() {
    const arrowSvg = this.shadowRoot.querySelector('.arrow-svg');
    arrowSvg.outerHTML = this.getArrowSvg();
  }

  getArrowSvg() {
    return `
      <svg class="arrow-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="${this.isOpen ? 'M15 12.5L10 7.5L5 12.5' : 'M5 7.5L10 12.5L15 7.5'}" 
              stroke="#204845" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  renderDropdown() {
    const dropdown = document.createElement('ul');
    dropdown.className = 'country-list';
    dropdown.innerHTML = this.countries.map(country => `
      <li data-code="${country.code}">
        <span>${country.flag}</span>
        <span>${country.name} (${country.nativeName})</span>
        <span>${country.code}</span>
      </li>
    `).join('');
    
    dropdown.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (li) {
        const country = this.countries.find(c => c.code === li.dataset.code);
        this.selectCountry(country);
      }
    });

    this.shadowRoot.querySelector('.country-dropdown').appendChild(dropdown);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="country-dropdown">
        <div class="selected-country">
          <span>${this.selectedCountry.flag}</span>
          <span>${this.selectedCountry.code}</span>
          ${this.getArrowSvg()}
        </div>
      </div>
    `;
    
    if (this.isOpen) {
      this.renderDropdown();
    }
  }
}

customElements.define('country-dropdown', CountryDropdown);