import { expect, type Locator, type Page, test } from "@playwright/test";

export class Login {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly usernameInputContinueButton: Locator;
  readonly passwordInputContinueButton: Locator;
  readonly signUpLink: Locator;

  readonly usernameInputPlaceholderText: string = "Enter email address";
  readonly pageTitle: string = "Fieldwire";

  readonly username: string;
  readonly password: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Email address" });
    this.passwordInput = page.getByTestId("login-page-password-input");
    this.usernameInputContinueButton = page.getByTestId(
      "login-page-email-continue-button"
    );
    this.passwordInputContinueButton = page.getByTestId(
      "login-page-confirm-login-button"
    );
    this.signUpLink = page.getByTestId("login-page-signup-button");

    test.fail(!process.env.FW_USERNAME, "Missing FW_USERNAME env variable");
    test.fail(!process.env.FW_PASSWORD, "Missing FW_PASSWORD env variable");

    this.username = process.env.FW_USERNAME || "<this env var is missing>";
    this.password = process.env.FW_PASSWORD || "<this env var is missing>";
  }

  async goto() {
    await this.page.goto("/");
  }
  async login() {
    await this.enterUsername();
    await this.enterPassword();
  }
  async enterUsername() {
    await this.usernameInput.fill(this.username);
    await this.usernameInputContinueButton.click();
  }
  async enterPassword() {
    await this.passwordInput.fill(this.password);
    await this.passwordInputContinueButton.click();
  }
  async expectUsernameInputPlaceholder() {
    await expect(this.usernameInput).toHaveAttribute(
      "placeholder",
      this.usernameInputPlaceholderText
    );
  }
  async expectPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }
}
