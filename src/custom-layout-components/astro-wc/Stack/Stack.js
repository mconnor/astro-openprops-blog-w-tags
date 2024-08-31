/**
 * @module stack-l
 * @description
 * A custom element for injecting white space (margin) between flow
 * (block) elements along a vertical axis.
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {boolean} recursive=false Whether the spaces apply recursively (i.e. regardless of nesting level)
 * @property {number} splitAfter=null The element after which to _split_ the stack with an auto margin
 */
export default class Stack extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Stack-${[this.space, this.recursive, this.splitAfter].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        const styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
            [data-i="${this.i}"]${this.recursive ? '' : ' >'} * + * {
              gap: ${this.space};
            }

            ${
              this.splitAfter
                ? `
              [data-i="${this.i}"]:only-child {
                block-size: 100%;
              }

              [data-i="${this.i}"] > :nth-child(${this.splitAfter}) {
                margin-block-end: auto;
              }`
                : ''
            }
          `
          .replace(/\s{2,}/g, ' ')
          .trim();
        document.head.appendChild(styleEl);
      }
    };
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    this.setAttribute('space', val);
  }

  get recursive() {
    return this.hasAttribute('recursive');
  }

  set recursive(val) {
    if (val) {
      this.setAttribute('recursive', '');
    } else {
      this.removeAttribute('recursive');
    }
  }

  get splitAfter() {
    const value = this.getAttribute('splitAfter');
    return value !== null ? value : '';
  }

  set splitAfter(val) {
    if (val) {
      this.setAttribute('splitAfter', val);
    } else {
      this.removeAttribute('splitAfter');
    }
  }

  static get observedAttributes() {
    return ['space', 'recursive', 'splitAfter'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

// if ('customElements' in window) {
//   customElements.define('stack-l', Stack);
// }
