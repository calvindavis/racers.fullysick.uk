import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("color-picker")
export class ColorPicker extends LitElement {
  @property({ type: String })
  name: String | null = null;

  @property({ type: String })
  value: String | null = null;

  @property({ type: Array<String> })
  options = ["green", "orange", "purple", "yellow"];

  _handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  render() {
    return html`
      <div class="color-picker" @input=${this._handleInput}>
        ${repeat(
          this.options,
          (option) => option,
          (option) =>
            html`<input
              type="radio"
              name=${this.name}
              value=${option}
              .checked=${option === this.value}
              style="background-color: var(--color-${option});"
            />`,
        )}
      </div>
    `;
  }

  static styles = css`
    input {
      appearance: none;
      width: 20px;
      height: 20px;
    }

    input:checked {
      outline: 1px solid black;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "color-picker": ColorPicker;
  }
}
