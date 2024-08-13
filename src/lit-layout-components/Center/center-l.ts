import { css, LitElement } from 'lit';
import { html } from 'lit-html';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import type { RmUnitType } from '#Types';
/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
@customElement('center-l')
export class CenterClass extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Check if this component was server-side rendered
    const isSSR = this.getAttribute('is:ssr') === 'true';
    console.log(`Is SSR: ${isSSR}`);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static styles = [
    css`
      :host {
        display: block;
        box-sizing: content-box;
        margin-inline: auto;
      }
      .centerText {
        text-align: center;
      }
      .isIntrinsic {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ];

  @property({ type: String })
  max: RmUnitType = 'var(--measure)';

  @property({ type: Boolean })
  gutters = false;

  @property({ type: Boolean })
  andText = false;

  @property({ type: Boolean })
  intrinsic = false;

  render() {
    const classes = { centerText: this.andText, isIntrinsic: this.intrinsic };

    const styles = {
      maxWidth: this.max,
      paddingInlineStart: this.gutters ?? '',
      paddingInlineEnd: this.gutters ?? '',
    };

    return html`<div class=${classMap(classes)} style=${styleMap(styles)}>
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'center-l': CenterClass;
  }
}
