import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { Racer } from "./Racer";
import { saveRacer } from "./supabase";

@customElement("racer-builder")
export class RacerBuilder extends LitElement {
  static RACER_KEY = "racer-builder-racer";

  @state()
  private racer: Racer = {
    id: null,
    name: null,
    image: null,
    ruleTitle: null,
    ruleDescription: null,
    credit: null,
    creditUrl: null,
    border1: "green",
    border2: "orange",
  };

  constructor() {
    super();

    const racerJson = localStorage.getItem(RacerBuilder.RACER_KEY);

    if (racerJson) {
      this.racer = JSON.parse(racerJson);
    }
  }

  _handleFormInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let name: string = target.name;
    let value: string = target.value;

    this.racer = { ...this.racer, [name]: value };
    localStorage.setItem(RacerBuilder.RACER_KEY, JSON.stringify(this.racer));
  }

  _reset() {
    this.racer = {
      id: null,
      name: null,
      image: null,
      ruleTitle: null,
      ruleDescription: null,
      credit: null,
      creditUrl: null,
      border1: "green",
      border2: "orange",
    };
    localStorage.setItem(RacerBuilder.RACER_KEY, JSON.stringify(this.racer));
  }

  _handleFormReset(event: Event) {
    event.preventDefault();
    this._reset();
  }

  async _handleFormSubmit(event: Event) {
    event.preventDefault();
    await saveRacer(this.racer);
    this._reset();
  }

  render() {
    return html` <div class="racer-builder">
      <form
        @input=${this._handleFormInput}
        @reset=${this._handleFormReset}
        @submit=${this._handleFormSubmit}
        autocomplete="off"
      >
        <div>
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            .value=${this.racer.name}
            autofocus
            maxlength="20"
            autocomplete="off"
            required
          />
        </div>
        <div>
          <label for="image">Image URL</label>
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            .value=${this.racer.image}
          />
        </div>
        <div>
          <label for="ruleTitle">Rule title</label>
          <input
            type="text"
            name="ruleTitle"
            placeholder="Rule title"
            maxlength="20"
            .value=${this.racer.ruleTitle}
          />
        </div>
        <div>
          <label for="ruleDescription">Rule description</label>
          <textarea
            maxlength="180"
            name="ruleDescription"
            rows="5"
            cols="50"
            placeholder="Rule description"
            .value=${this.racer.ruleDescription}
            required
          ></textarea>
        </div>
        <div>
          <label for="credit">Credit</label>
          <input
            maxlength="20"
            type="text"
            name="credit"
            placeholder="Credit"
            .value=${this.racer.credit}
          />
        </div>
        <div>
          <label for="creditUrl">Credit URL</label>
          <input
            type="url"
            name="creditUrl"
            placeholder="Credit URL"
            .value=${this.racer.creditUrl}
          />
        </div>
        <div>
          <label for="border1">Border 1</label>
          <color-picker
            name="border1"
            .value=${this.racer.border1}
          ></color-picker>
        </div>
        <div>
          <label for="border2">Border 2</label>
          <color-picker
            name="border2"
            .value=${this.racer.border2}
          ></color-picker>
        </div>
        <div>
          <button type="reset">Clear</button>
          <button type="submit">Save Racer</button>
        </div>
      </form>

      <racer-card .racer=${this.racer}></racer-card>
    </div>`;
  }

  static styles = css`
    .racer-builder {
      display: flex;
      gap: 40px;
    }

    label {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-builder": RacerBuilder;
  }
}
