class AstroThemeSwitcher extends HTMLElement {
  constructor() {
    super();

    // Bind the handleChange method to ensure the context is correct when called
    this.handleChange = this.handleChange.bind(this);
  }

  connectedCallback() {
    const form = this.querySelector('[data-select-theme]');
    form?.addEventListener('input', this.handleChange);
  }

  disconnectedCallback() {
    const form = this.querySelector('[data-select-theme]');
    form?.removeEventListener('input', this.handleChange);
  }

  handleChange(e) {
    const _firstDocElement = window.document.firstElementChild;

    _firstDocElement?.setAttribute('data-theme', e.target.value);
    localStorage.setItem('theme', e.target.value);
  }
}

customElements.define('astro-theme-switcher', AstroThemeSwitcher);
