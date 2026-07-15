import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import type { Racer } from "./Racer";

@customElement("racer-card")
export class RacerCard extends LitElement {
  @property({ type: Object }) racer: Racer | null = null;

  render() {
    return html`
      <div
        class="racer-card ${
          this.racer?.border1
            ? `racer-card--border-1-${this.racer.border1}`
            : ""
        } ${
          this.racer?.border2
            ? `racer-card--border-2-${this.racer.border2}`
            : ""
        }"
      >
        <div class="racer-card__top">
          ${when(
            this.racer?.name,
            () => html`<div class="racer-card__name">${this.racer?.name}</div>`,
          )}
          ${when(
            this.racer?.image,
            () =>
              html`<img
                class="racer-card__image"
                src="${this.racer?.image}"
                alt=""
              />`,
          )}
        </div>
        <div class="racer-card__bottom">
          ${when(
            this.racer?.ruleTitle,
            () =>
              html`<div class="racer-card__rule-title">
                ${this.racer?.ruleTitle}
              </div>`,
          )}

          <div class="racer-card__rule-description">
            ${this.racer?.ruleDescription}
          </div>
          ${when(
            this.racer?.creditUrl && this.racer?.credit,
            () =>
              html`<a
                class="racer-card__credit"
                href="${this.racer?.creditUrl}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Credit: ${this.racer?.credit} ↗
              </a>`,
            () =>
              when(
                this.racer?.credit,
                () =>
                  html`<div class="racer-card__credit">
                    Credit: ${this.racer?.credit}
                  </div>`,
              ),
          )}
        </div>
        <a href="/racer/${this.racer?.id}">RACER DETAIL</a>
      </div>
    `;
  }

  static styles = css`
    .racer-card {
      --background-color: var(--color-brown);
      --border-color-1: var(--color-orange);
      --border-color-2: var(--color-yellow);
      --border-radius: 17px;
      --border-width: 5px;
      --padding: 20px;
      --height: 502px;
      --width: 358px;

      background-color: var(--background-color);
      color: var(--color-black);
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;
      height: var(--height);
      padding: var(--padding);
      width: var(--width);
    }

    .racer-card--border-1-green {
      --border-color-1: var(--color-green);
    }

    .racer-card--border-1-orange {
      --border-color-1: var(--color-orange);
    }

    .racer-card--border-1-purple {
      --border-color-1: var(--color-purple);
    }

    .racer-card--border-1-yellow {
      --border-color-1: var(--color-yellow);
    }

    .racer-card--border-2-green {
      --border-color-2: var(--color-green);
    }

    .racer-card--border-2-orange {
      --border-color-2: var(--color-orange);
    }

    .racer-card--border-2-purple {
      --border-color-2: var(--color-purple);
    }

    .racer-card--border-2-yellow {
      --border-color-2: var(--color-yellow);
    }

    .racer-card__top {
      background-color: var(--color-white);
      border-radius: 15px 50px 15px 50px;
      box-shadow:
        inset 0 0 0 var(--border-width) var(--border-color-1),
        inset 0 0 0 calc(2 * var(--border-width)) var(--background-color),
        inset 0 0 0 calc(3 * var(--border-width)) var(--border-color-2);
      height: 100%;
      padding: calc(2 * var(--border-width));
      //margin-bottom: calc(-1 * var(--border-width));
      margin-bottom: var(--border-width);
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .racer-card__name {
      align-self: start;
      font-size: 32px;
      font-family: fantasy, sans-serif;
      background-color: var(--border-color-2);
      border-radius: 15px 0 99px 0;
      padding: 0.3em 1em 0.3em 0.5em;
      position: relative;
      text-transform: uppercase;
      z-index: 10;
      max-width: 60%;
      word-break: break-all;
      line-height: 28px;
    }

    .racer-card__image {
      position: absolute;
      top: calc(3 * var(--border-width));
      right: calc(3 * var(--border-width));
      bottom: calc(3 * var(--border-width));
      left: calc(3 * var(--border-width));
      width: calc(100% - 6 * var(--border-width));
      height: calc(100% - 6 * var(--border-width));
      border-radius: 0 34px 5px 34px;
      object-fit: cover;
    }

    .racer-card__bottom {
      background-color: var(--color-white);
      border-radius: 50px 15px 50px 15px;
      box-shadow:
        inset 0 0 0 var(--border-width) var(--border-color-2),
        inset 0 0 0 calc(2 * var(--border-width)) var(--background-color),
        inset 0 0 0 calc(3 * var(--border-width)) var(--border-color-1);
      padding: calc(2 * var(--border-width));
      position: relative;
    }

    .racer-card__rule-title {
      position: absolute;
      top: calc(3 * var(--border-width));
      right: calc(3 * var(--border-width));
      font-size: 11px;
      padding: 0 0.667em 0.333em 1.5em;
      border-radius: 0 0 0 99px;
      text-transform: uppercase;
      text-align: right;
      background-color: var(--border-color-1);
    }

    .racer-card__rule-description {
      text-align: center;
      padding: 40px;
      font-size: 18px;
    }

    .racer-card__credit {
      color: inherit;
      text-decoration: none;
      position: absolute;
      bottom: calc(3 * var(--border-width));
      left: calc(3 * var(--border-width));
      font-size: 11px;
      padding: 0.333em 1.5em 0 0.667em;
      border-radius: 0 99px 0 0;
      background-color: var(--border-color-1);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "racer-card": RacerCard;
  }
}
