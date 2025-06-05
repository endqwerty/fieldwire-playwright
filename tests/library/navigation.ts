import { expect, type Locator, type Page, test } from "@playwright/test";

export class Navigation {
  readonly page: Page;
  readonly profileMenuDropdown: Locator;
  readonly formsSidebarItem: Locator;
  readonly tasksSidebarItem: Locator;
  constructor(page: Page) {
    this.page = page;
    this.profileMenuDropdown = page.getByTestId("profile-menu");
    this.formsSidebarItem = page.getByTestId("project-sidebar-forms-tab");
    this.tasksSidebarItem = page.getByTestId("project-sidebar-tasks-tab");
  }

  async expectProfileMenuDropdown() {
    await expect(this.profileMenuDropdown).toBeVisible();
  }
  async openForms() {
    await this.formsSidebarItem.click();
  }
  async openTasks() {
    await this.tasksSidebarItem.click();
  }
}
