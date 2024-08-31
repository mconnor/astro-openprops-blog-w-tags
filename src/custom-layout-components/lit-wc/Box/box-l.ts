import type { RmUnitType, BorderStyle } from '#UnitTypes.js';

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {string} borderStyle
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */

const mainColor = css`var(--my-color, blue)`;
const bgColor = css`var(--my-bg-color, yellow)`;

@customElement('box-l')
export class Box extends LitElement {
  // Note that the host element can be affected by styles from outside the shadow tree,

  static styles = [
    css`
      :host {
        display: block;
        outline: 0.125rem solid red;
        outline-offset: -0.125rem;
      }

      .inverted {
        color: ${bgColor};
        background-color: ${mainColor};
      }
    `,
  ];

  @property({ type: String })
  padding: RmUnitType = 'var(--s0)';

  @property({ type: String })
  borderWidth: RmUnitType = 'var(--border-thin)';

  @property({ type: Boolean, reflect: true })
  invert = false;

  @property({ type: String })
  borderStyle: BorderStyle = 'solid';

  render() {
    const styles = {
      borderWidth: this.borderWidth,
      borderStyle: this.borderStyle,
      padding: this.padding,
    };

    return html`<div
      id="root"
      class=${classMap({ inverted: this.invert })}
      style=${styleMap(styles)}
    >
      <slot></slot>
    </div>`;
  }
  // protected createRenderRoot() {
  //   return this;
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'box-l': Box;
  }
}
