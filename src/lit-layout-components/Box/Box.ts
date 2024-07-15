import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';

@customElement('box-l')
export class Box extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        outline: 0.125rem solid transparent;
        outline-offset: -0.125rem;
        color: var(--my-color);
        background-color: black;
      }
    `,
  ];

  @property({ type: String })
  padding = 'var(--s0)';

  @property({ type: String, attribute: 'border-width' })
  borderWidth = '4px';

  @property({ type: Boolean })
  invert = false;

  render() {
    const styles = {
      border: `${this.borderWidth} solid`,
      padding: this.padding,
      filter: this.invert ? 'invert(100%)' : '',
    };

    return html`<div style=${styleMap(styles)}><slot></slot></div>`;
  }
}

// declare global {
//   interface HTMLElementTagNameMap {
//     "box-l": Box;
//   }
// }
