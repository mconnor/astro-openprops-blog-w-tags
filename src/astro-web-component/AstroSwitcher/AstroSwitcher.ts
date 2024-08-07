import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('astro-theme-switcher')
class AstroThemeSwitcher extends LitElement {
  static styles = [
    css`
      form {
        display: flex;
        flex-wrap: wrap;
        gap: var(--s0);
        font-size: var(--font-size-0);
      }
    `,
  ];

  @property({ type: Boolean })
  isVisible = false;

  connectedCallback() {
    const form = this.querySelector('[data-select-theme]') as HTMLFormElement;
    form?.addEventListener('input', this.handleChange.bind(this));
  }

  disconnectedCallback() {
    const form = this.querySelector('[data-select-theme]');
    form?.removeEventListener('input', this.handleChange);
  }

  handleChange(e: Event) {
    const htmlTag = document.firstElementChild;

    htmlTag &&
      htmlTag.setAttribute('data-theme', (e.target as HTMLInputElement).value);
    localStorage.setItem('theme', (e.target as HTMLInputElement).value);
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'astro-theme-switcher': AstroThemeSwitcher;
  }
}
