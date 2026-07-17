import { COLORS } from "@/constants";
import type { Racer } from "@/types/Racer";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("error-page")
export class ErrorPage extends LitElement {
  private _errorRacer: Racer = {
    border1: COLORS[0],
    border2: COLORS[1],
    credit: "Calvin Davis",
    creditUrl: "https://github.com/calvindavis",
    image:
      "https://thumbs.dreamstime.com/b/dizzy-man-his-confused-head-spinning-41557657.jpg",
    name: "Error",
    ruleDescription: `When I navigate to ${window.location.pathname}, I am eliminated from the race.`,
    ruleTitle: "404 - Not Found",
  };

  render() {
    return html`<racer-card .racer=${this._errorRacer}></racer-card>`;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }

    racer-card {
      transform: translateY(25%) rotate(10deg) scale(1.5);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "error-page": ErrorPage;
  }
}
