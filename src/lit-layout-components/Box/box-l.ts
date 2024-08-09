import { css, LitElement } from 'lit';
import { html } from 'lit-html';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { RmUnitType, BorderStyle } from '@/lit-layout-components/Types';
/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
@customElement('box-l')
export class BoxClass extends LitElement {
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
        outline: 0.125rem solid transparent;
        outline-offset: -0.125rem;
      }

      .highlighted {
        opacity: 0.2;
      }
    `,
  ];

  @property({ type: String })
  padding: RmUnitType = 'var(--s0)';

  @property({ type: String })
  borderWidth: RmUnitType = '1px';

  @property({ type: Boolean })
  invert = false;

  @property({ type: Boolean })
  highlight = false;

  @property({ type: String })
  borderStyle: BorderStyle = 'solid';

  override render() {
    const styles = {
      borderWidth: this.borderWidth,
      borderStyle: this.borderStyle,
      padding: this.padding,
      color: this.invert ? 'var(--my-bg-color)' : 'var(--my-color)',
      backgroundColor: this.invert ? 'var(--my-color)' : 'var(--my-bt-color)',
    };

    return html`<div style=${styleMap(styles)}>
      <slot></slot>
    </div>`;
  }
}

// declare global {
//   interface HTMLElementTagNameMap {
//     'box-l': Box;
//   }
// }
