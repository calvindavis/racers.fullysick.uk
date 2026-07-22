import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("error-page")
export class ErrorPage extends LitElement {
  render() {
    return html`<racer-card
      name="Error"
      ruleDescription=${`When I navigate to ${window.location.pathname}, I am eliminated from the race.`}
      ruleTitle="404 - Not Found"
      image="https://thumbs.dreamstime.com/b/dizzy-man-his-confused-head-spinning-41557657.jpg"
    ></racer-card>`;
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
