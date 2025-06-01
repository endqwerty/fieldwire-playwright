import { expect, type Locator, type Page, test } from "@playwright/test";

export class Login {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly usernameInputPlaceholderText: string = "Enter email address";
  readonly username: string;
  readonly password: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Email address" });
    this.passwordInput = this.continueButton = page.getByRole("button", {
      name: "Continue",
    });
    test.fail(!process.env.FW_USERNAME, "Missing FW_USERNAME env variable");
    test.fail(!process.env.FW_PASSWORD, "Missing FW_PASSWORD env variable");
    this.username = process.env.FW_USERNAME || "<this env var is missing>";
    this.password = process.env.FW_PASSWORD || "<this env var is missing>";
  }
  async goto() {
    await this.page.goto("/");
  }
  async login() {}
  async enterUsername() {
    await this.usernameInput.fill(this.usernameInputPlaceholderText);
    await this.continueButton.click();
  }
  async enterPassword() {}
  async expectUsernameInputPlaceholder() {
    await expect(this.usernameInput).toHaveAttribute(
      "placeholder",
      "Enter email address"
    );
  }
}
