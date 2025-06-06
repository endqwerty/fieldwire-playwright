import { expect, type Locator, type Page, test } from "@playwright/test";

export class Tasks {
  readonly page: Page;
  readonly newTaskButton: Locator;
  readonly calendarViewButton: Locator;
  readonly taskPriorityCountPriority2Label: Locator;
  readonly kanbanViewButton: Locator;
  readonly ganttChartViewButton: Locator;
  readonly analyticsViewButton: Locator;
  readonly taskPriorityCountTasksLabel: Locator;
  readonly taskEditTaskNameLabel: Locator;
  readonly taskEditTaskNameInput: Locator;
  readonly taskEditTaskCheckButton: Locator;
  readonly taskEditTaskDismissButton: Locator;
  readonly tasksRightClickDeleteButton: Locator;
  readonly tasksModalConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTaskButton = page.getByTestId("create-new-task");
    this.calendarViewButton = page.getByRole("button", { name: "Calendar" });
    this.kanbanViewButton = page.getByRole("button", { name: "Kanban" });
    this.ganttChartViewButton = page.getByRole("button", {
      name: "Gantt Chart",
    });
    this.analyticsViewButton = page.getByRole("button", { name: "Analytics" });
    this.taskPriorityCountPriority2Label = page.getByTestId(
      "task-priority-count-Priority 2"
    );
    this.taskPriorityCountTasksLabel = page.getByTestId(
      "task-priority-count-TASKS"
    );
    this.taskEditTaskNameLabel = page.getByTestId("task-edit-name");
    this.taskEditTaskNameInput = page.locator('textarea[name="taskName"]');
    this.taskEditTaskCheckButton = page.getByTestId("task-edit-check");
    this.taskEditTaskDismissButton = page.getByTestId("task-edit-dismiss");
    this.tasksRightClickDeleteButton = page.getByTestId(
      "tasks-page-right-click-action-delete"
    );
    this.tasksModalConfirmButton = page.getByTestId(
      "confirm-action-modal-action-btn"
    );
  }
  private removeNonDigits(input: string): string {
    return input.replace(/\D/g, "");
  }

  async expectOnTasksPage() {
    await expect(this.newTaskButton).toBeVisible();
  }
  async switchToCalendarView() {
    await this.calendarViewButton.click();
  }
  async switchToKanbanView() {
    await this.kanbanViewButton.click();
  }
  async switchToGanttChartView() {
    await this.ganttChartViewButton.click();
  }
  async switchToAnalyticsView() {
    await this.analyticsViewButton.click();
  }
  async getPriority2TasksCount(): Promise<number> {
    const rawText = await this.taskPriorityCountPriority2Label.innerText();
    const numericText = this.removeNonDigits(rawText);
    return Number(numericText);
  }
  async expectCalendarTasksCount(count: number) {
    const rawText = await this.taskPriorityCountTasksLabel.innerText();
    // Remove all non-digit characters to extract the number
    const numericText = this.removeNonDigits(rawText);
    expect(Number(numericText)).toEqual(count);
  }
  async expectGanttChartTasksCount(count: number) {
    const rawText = await this.taskPriorityCountTasksLabel.innerText();
    // Remove all non-digit characters to extract the number
    const numericText = this.removeNonDigits(rawText);
    expect(Number(numericText)).toEqual(count);
  }
  async createNewTask(name: string) {
    await this.newTaskButton.click();
    await this.taskEditTaskNameLabel.click();
    await this.taskEditTaskNameInput.fill(name);
    await this.taskEditTaskCheckButton.click();
    await this.taskEditTaskDismissButton.click();
  }
  async rightClickOnTask(taskName: string) {
    await this.page
      .locator(`div[title="${taskName}"]`)
      .click({ button: "right" });
  }
  async deleteTask(name: string) {
    await this.rightClickOnTask(name);
    await this.tasksRightClickDeleteButton.click();
    await this.tasksModalConfirmButton.click();
  }

  // this function auto retrys until it is true.
  async expectPriority2TasksCount(count: number) {
    await expect(async () => {
      const rawText = await this.taskPriorityCountPriority2Label.innerText();
      const numericText = this.removeNonDigits(rawText);
      expect(Number(numericText)).toEqual(count);
    }).toPass;
  }
}
