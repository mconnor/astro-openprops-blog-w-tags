import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { BorderStyle, RmUnitType } from '#UnitTypes.ts';

/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {string}
 */

const mainColor = css`var(--theme-primary, blue)`;
const bgColor = css`var(--theme-secondary, yellow)`;

@customElement('box-l')
export class Box extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        outline: 0.125rem solid transparent;
        outline-offset: -0.125rem;
      }

      ::slotted {
        color: ${mainColor};
        background-color: ${bgColor};
      }

      ::slotted(*) {
        color: inherit;
        background-color: inherit;
      }

      .highlighted {
        opacity: 0.2;
      }

      .active {
        border: solid red;
      }

      .inverted {
        color: ${bgColor};
        background-color: ${mainColor};
      }
    `,
  ];

  @property({ type: String, reflect: true })
  padding?: RmUnitType = 'var(--s0)';

  @property({ type: String, reflect: true, attribute: 'border-width' })
  borderWidth?: RmUnitType = '1px';

  @property({ type: String, reflect: true, attribute: 'border-style' })
  borderStyle?: BorderStyle = 'solid';

  @property({ type: Boolean, reflect: true })
  invert = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  protected render() {
    const styles = {
      borderWidth: this.borderWidth,
      borderStyle: this.borderStyle,
      padding: this.padding,
    };

    return html`<div
      class=${classMap({ inverted: this.invert, active: this.active })}
      style=${styleMap(styles)}
      @click="${() => (this.active = !this.active)}"
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'box-l': Box;
  }
}
