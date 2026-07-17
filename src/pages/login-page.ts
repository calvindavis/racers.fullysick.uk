import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { logIn } from "@/supabase";

@customElement("login-page")
export class LoginPage extends LitElement {
  static EMAIL_KEY = "email";

  @state()
  private _isLoading = false;

  @state()
  private _isSubmitted = false;

  private async _handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get(LoginPage.EMAIL_KEY) as string;
    console.log(event, form, formData, email);

    this._isLoading = true;
    await logIn(email);
    this._isSubmitted = true;
  }

  render() {
    if (this._isSubmitted) {
      return html`<p>Keep your eyes on your inbox!</p>`;
    }

    return html`<h1>Login</h1>
      <form @submit=${this._handleSubmit}>
        ${when(this._isLoading, () => html`<p>LOADING!!!</p>`)}

        <div>
          <label for="${LoginPage.EMAIL_KEY}}">Email</label>
          <input name=${LoginPage.EMAIL_KEY} type="email" required />
        </div>

        <div>
          <button type="submit">Log in</button>
        </div>
      </form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "login-page": LoginPage;
  }
}
