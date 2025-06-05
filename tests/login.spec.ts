import { test, expect } from "@playwright/test";
import { Login } from "./library/login";
import { Navigation } from "./library/navigation";

test("has title", async ({ page }) => {
  const loginPage = new Login(page);
  await loginPage.goto();
  await loginPage.expectPageTitle();
});

test("login form", async ({ page }) => {
  const loginPage = new Login(page);
  await loginPage.goto();

  await expect(
    page.getByRole("img", { name: "Fieldwire by Hilti logo" })
  ).toBeVisible();
  await expect(page.locator("form.auth-form")).toBeVisible();

  await expect(page.getByText("Log in")).toBeVisible();

  await loginPage.expectUsernameInputPlaceholder();
});

test("login", async ({ page }) => {
  const loginPage = new Login(page);
  const navigation = new Navigation(page);
  await loginPage.goto();

  await loginPage.login();
  await navigation.expectProfileMenuDropdown();
});
