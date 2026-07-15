import "./auth-nav";
import "./color-picker";
import "./json-racers";
import "./racer-builder";
import "./racer-card";
import "./racer-grid";
import "./racer-page";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";

@customElement("rowdy-racers")
export class RowdyRacers extends LitElement {
  private _router = new Router(this, [
    { path: "/", render: () => html`<json-racers></json-racers>` },
    {
      path: "/racer/:racerId",
      render: ({ racerId }) =>
        html`<p>${racerId}<racer-page .racerId=${racerId}></racer-page></p>`,
    },
    { path: "/create", render: () => html`<racer-builder></racer-builder>` },
  ]);

  render() {
    const title = import.meta.env.VITE_TITLE;

    return html` <div class="rowdy-racers">
      <h1>${title}</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/create">Create</a>
      </nav>
      <auth-nav></auth-nav>
      ${this._router.outlet()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "rowdy-racers": RowdyRacers;
  }
}
