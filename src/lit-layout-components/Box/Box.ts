import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';
// import {classMap} from 'lit/directives/class-map.js';

@customElement('box-l')
export class Box extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        outline: 0.125rem solid transparent;
        outline-offset: -0.125rem;
      }
    `,
  ];

  @property()
  padding = 'var(--s0)';

  @property()
  borderWidth = 'var(--border-thin)';

  @property({ type: Boolean })
  invert = false;

  render() {
    const styles = {
      border: `${this.borderWidth} solid`,
      padding: this.padding,
      color: this.invert ? 'var(--my-bg-color)' : 'var(--my-color)',
      backgroundColor: this.invert ? 'var(--my-color)' : 'var(--my-bt-color)',
    };

    return html`<div style=${styleMap(styles)}><slot></slot></div>`;
  }
}

// declare global {
//   interface HTMLElementTagNameMap {
//     "box-l": Box;
//   }
// }
