import { expect, type Locator, type Page, test } from "@playwright/test";

export class Forms {
  readonly page: Page;
  readonly newFormButton: Locator;
  readonly newFormDropdownNewTemplateDropdown: Locator;
  readonly newFormDropdowCreateNewTemplateButton: Locator;

  readonly formActionsDropdown: Locator;
  readonly formActionsSelectAllOption: Locator;
  // readonly formActionsDeselectAllOption: Locator;
  // readonly formActionsDeleteOption: Locator;
  readonly manageTemplatesButton: Locator;
  readonly createFormTemplateModalNameInput: Locator;
  readonly createFormTemplateModalSelectionDropdown: Locator;
  readonly createFormTemplateModalSelectionBlankTemplateOption: Locator;
  readonly createFormTemplateModalDateSwitch: Locator;

  readonly popUpModal: Locator;
  readonly popUpModalConfirmButton: Locator;
  readonly popUpModalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popUpModal = page.locator("modal-container");
    this.popUpModalConfirmButton = page.getByTestId(
      "confirm-action-modal-action-btn"
    );
    this.popUpModalCloseButton = page.locator("div.close-modal");

    this.newFormButton = page.getByTestId("forms-new-form-btn");
    this.newFormDropdownNewTemplateDropdown = page.getByTestId(
      "new-form-dropdown-new-template-btn"
    );
    this.newFormDropdowCreateNewTemplateButton = page.locator(
      "create-new-template-button"
    );
    this.formActionsDropdown = page.getByTestId("forms-actions-dropdown-btn");
    this.formActionsSelectAllOption = page.getByTestId(
      "forms-selected-select-all-option"
    );
    // this.formActionsSelectAllOption = page.getByTestId(
    //   "forms-selected-deselect-all-option"
    // );
    this.manageTemplatesButton = page.getByTestId(
      "forms-manage-templates-dropdown-btn"
    );
    this.createFormTemplateModalSelectionDropdown = page.getByTestId(
      "create-form-template-modal-template-selection-dropdown"
    );
    this.createFormTemplateModalNameInput = page.getByTestId(
      "create-form-template-modal-name-input"
    );
    this.createFormTemplateModalSelectionBlankTemplateOption = page.getByTestId(
      "create-form-template-modal-new-blank-template-button"
    );
    this.createFormTemplateModalDateSwitch = page.getByTestId(
      "create-form-template-modal-date-switch"
    );
  }
  async expectOnFormsPage() {
    await expect(this.newFormButton).toBeVisible();
  }
  async closeModalIfOpen() {
    if (await this.popUpModal.isVisible()) {
      await this.popUpModalCloseButton.click();
      await expect(this.popUpModal).not.toBeAttached();
    }
  }

  async createNewTemplate(dated: boolean, name: string) {
    await this.newFormButton.click();
    await this.newFormDropdownNewTemplateDropdown.hover();
    await this.newFormDropdowCreateNewTemplateButton.click();
    await this.createFormTemplateModalSelectionDropdown.click();
    await this.createFormTemplateModalSelectionBlankTemplateOption.click();
    await this.createFormTemplateModalNameInput.fill(name);
    if (dated) {
      //TODO: this isn't working yet
      this.createFormTemplateModalDateSwitch.click();
    }
  }
}
