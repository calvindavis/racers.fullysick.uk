import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";
import { when } from "lit/directives/when.js";
import { getUser } from "@/supabase";

@customElement("auth-nav")
export class AuthNav extends LitElement {
  private _getUserTask = new Task(this, {
    task: () => getUser(),
    args: () => [],
  });

  render() {
    return this._getUserTask.render({
      pending: () => html`<p>Loading...</p>`,
      complete: (user) =>
        when(
          user,
          () => html`
            <a href="/profile">Profile</a>
            <a href="/logout">Log out</a>
          `,
          () => html`<a href="/login">Log in</a>`,
        ),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "auth-nav": AuthNav;
  }
}
