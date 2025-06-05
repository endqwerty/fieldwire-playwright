import { test, expect } from "@playwright/test";
import { Login } from "./library/login";
import { Dashboard } from "./library/dashboard";
import { Navigation } from "./library/navigation";
import { Forms } from "./library/forms";

const projectName = "My first project";

test.describe("forms", async () => {
  test.beforeEach(async ({ page }) => {
    const login = new Login(page);
    const dashboard = new Dashboard(page);
    const navigation = new Navigation(page);
    const forms = new Forms(page);

    await login.goto();
    await login.login();
    await navigation.expectProfileMenuDropdown();
    await dashboard.openProject(projectName);
    await navigation.openForms();
    await forms.expectOnFormsPage();
    await forms.closeModalIfOpen();
  });

  test.describe("templates", async () => {
    test.describe("new template from blank ", async () => {
      let datedTemplateOptions = [true, false];

      datedTemplateOptions.forEach(async (datedTemplateOption) => {
        test.describe(`dated template: ${datedTemplateOption}`, async () => {
          test("with a valid name", async ({ page }) => {
            const forms = new Forms(page);
            await forms.createNewTemplate(
              datedTemplateOption,
              "test template name"
            );
          });
        });
      });
    });
    test.describe("new template from pdf upload ", async () => {
      let datedTemplateOptions = [true, false];

      datedTemplateOptions.forEach(async (datedTemplateOption) => {
        test(`dated template: ${datedTemplateOption}`, async () => {
          test("with name", async () => {});
        });
      });
    });
    test.describe("new template from pre-built templates", async () => {
      let datedTemplateOptions = [true, false];
    });
  });
});
