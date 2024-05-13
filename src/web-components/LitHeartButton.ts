import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const mainColor = css`var(--brand)`;

@customElement('lit-heart-button')
export class LitHeartButton extends LitElement {
  static styles = css`
    div  {
      background-color: ${mainColor};
      display: flex;
      flex-direction: row;
      /* align-items: space-between; */
      justify-content: space-around;
      border: 1px solid black;
     max-inline-size: var(--size-content-1);

  
  `;

  @property({ type: Number, reflect: true })
  count: number = 0;

  click() {
    this.count++;
  }

  render() {
    return html`
      <div>
        <button class="btn" @click=${this.click} aria-label="Heart">💜</button>
        <slot></slot>
        <span>${this.count}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-heart-button': LitHeartButton;
  }
}
