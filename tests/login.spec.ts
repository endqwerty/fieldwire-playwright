import { test, expect } from "@playwright/test";
import { Login } from "./library/login";

test("has title", async ({ page }) => {
  await test.step("navigate to the homepage", async () => {
    await page.goto("/");
  });
  await test.step('expect title to contain "Fieldwire"', async () => {
    await expect(page).toHaveTitle(/Fieldwire/);
  });
});

test("login form", async ({ page }) => {
  const loginPage = new Login(page);
  await loginPage.goto();
  await loginPage.expectUsernameInputPlaceholder();
  await loginPage.login();

  await expect(
    page.getByRole("img", { name: "Fieldwire by Hilti logo" })
  ).toBeVisible();
  await expect(page.locator("form.auth-form")).toBeVisible();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Log in")).toBeVisible();
});
