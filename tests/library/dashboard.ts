import { expect, type Locator, type Page, test } from "@playwright/test";

export class Dashboard {
  readonly page: Page;
  readonly projectPageTabs: Locator;
  readonly projectCardNameId: string = "-project-card-name";

  constructor(page: Page) {
    this.page = page;
    this.projectPageTabs = page.getByTestId("projects-page-tabs");
  }
  async openProject(projectName: string) {
    this.page.getByTestId(projectName + this.projectCardNameId).click();
  }
}
