import { test, expect } from "@playwright/test";
import { Login } from "./library/login";
import { Dashboard } from "./library/dashboard";
import { Navigation } from "./library/navigation";
import { Forms } from "./library/forms";
import { faker } from "@faker-js/faker";

const projectName = "My first project";
const projectId = "0397dab6-91f1-4586-bf80-6f19b38b6844";

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
          test.afterEach(async ({ page }) => {});

          test("with a valid name", async ({ page }) => {
            const newnName = faker.lorem.words({ min: 1, max: 5 });
            // this does still have the potential to run into an issue with the name already existing.
            // it should either check that the name doesn't already exist or use a clean db
            const forms = new Forms(page);

            const { templateId, authToken } = await forms.createNewTemplate(
              datedTemplateOption,
              newnName
            );
            // seems like there's some logic here for deciding if the user is returned to the table or taken into the edit page.
            // if (datedTemplateOption) {
            //   await forms.expectTemplateWithNameToBeVisibleInTable(newnName);
            // } else {
            //   await forms.expectTemplateWithNameToBeCreated(newnName);
            // }
            expect(templateId.length).toBeGreaterThan(0);

            // get the template id
            // delete using api request
            // this could also be refactored into after each to clean up even if the test fails
            const request = await page.request.delete(
              `/api/v3/projects/${projectId}/form_templates/${templateId}`,
              { headers: { authorization: authToken } }
            );
            await expect(request.ok()).toBeTruthy();
          });
        });
      });
    });
    test.describe("new template from pdf upload ", async () => {
      let datedTemplateOptions = [true, false];

      datedTemplateOptions.forEach(async (datedTemplateOption) => {
        test(`dated template: ${datedTemplateOption}`, async () => {
          test.fixme();
        });
      });
    });
    test.describe("new template from pre-built templates", async () => {
      let datedTemplateOptions = [true, false];
    });
  });
});
