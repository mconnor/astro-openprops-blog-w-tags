import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('lit-heart-button')
export class LitHeartButton extends LitElement {
  static styles = css`
    button {
      background-color: #f3f4f6;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #e2e8f0;
    }
  `

  @property({ type: Number, reflect: true })
  count: number = 0

  click() {
    this.count++
  }

  render() {
    return html`
      <button @click=${this.click} aria-label="Heart">💜</button>${this
        .count}<span></span>
    `
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-heart-button': LitHeartButton
  }
}
