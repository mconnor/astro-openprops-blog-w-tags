import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';

// const invertValue = css`invert(100%)`;
// const defaultFilterValue = css`defaultFilterValue`;

// const kolor = css`--text-3`;
// const myBG = css`--surface-3`;

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

  // static properties = { padding: { type: String } };
  // padding = "10px";

  @property()
  padding = 'var(--s1)';

  @property()
  borderWidth = 'var(--border-thin)';

  @property()
  invert = false;

  render() {
    const styles = {
      border: `${this.borderWidth} solid`,
      padding: this.padding,
      filter: this.invert ? 'invert(100%)' : '',
      color: `var(--box-color, green)`,
      backgroundColor: `var(--box-background, yellow)`,
    };

    return html`<div style=${styleMap(styles)}><slot /></div>`;
  }
}

// declare global {
//   interface HTMLElementTagNameMap {
//     "box-l": Box;
//   }
// }
