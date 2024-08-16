import { css, LitElement } from 'lit';
import { html } from 'lit-html';
import { customElement, property } from 'lit/decorators.js';

@customElement('astro-theme-switcher')
export class AstroThemeSwitcher extends LitElement {
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
    const form = this.querySelector('[data-select-theme]')!;
    form.addEventListener('input', this.handleChange.bind(this));
  }

  disconnectedCallback() {
    const form = this.querySelector('[data-select-theme]')!;
    form.removeEventListener('input', this.handleChange);
  }

  handleChange = (e: Event): void => {
    const htmlTag = document.firstElementChild!;

    htmlTag.setAttribute('data-theme', (e.target as HTMLInputElement).value);
    localStorage.setItem('theme', (e.target as HTMLInputElement).value);
  };

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'astro-theme-switcher': AstroThemeSwitcher;
  }
}
