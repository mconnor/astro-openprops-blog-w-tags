import { LitElement, html, css, property, customElement } from 'lit'

/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */

@customElement('box-l')
class Box extends LitElement {
  @property({ type: String }) padding = 'var(--s1)'
  @property({ type: String }) borderWidth = 'var(--border-thin)'
  @property({ type: Boolean, reflect: true }) invert = false

  static styles = css`
    :host {
      display: block;
      padding: var(--s1);
      border: var(--border-thin) solid;
      color: inherit;
      background-color: inherit;
    }

    :host([invert]) {
      filter: invert(100%);
    }
  `

  render() {
    return html`
      <div style="padding: ${this.padding}; border-width: ${this.borderWidth};">
        <slot></slot>
      </div>
    `
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('padding') ||
      changedProperties.has('borderWidth')
    ) {
      this.style.padding = this.padding
      this.style.borderWidth = this.borderWidth
    }
  }
}

// declare global {
//   interface HTMLElementTagNameMap {
//     'box-l': Box
//   }
// }
