import { test, expect } from "@playwright/test";
import { Login } from "./library/login";
import { Dashboard } from "./library/dashboard";
import { Navigation } from "./library/navigation";
import { Tasks } from "./library/tasks";
import { faker } from "@faker-js/faker";

const projectName = "My first project";
const projectId = "0397dab6-91f1-4586-bf80-6f19b38b6844";

test.describe("tasks", async () => {
  test.beforeEach(async ({ page }) => {
    const login = new Login(page);
    const dashboard = new Dashboard(page);
    const navigation = new Navigation(page);
    const tasks = new Tasks(page);
    await login.goto();
    await login.login();
    await navigation.expectProfileMenuDropdown();
    await dashboard.openProject(projectName);
    await navigation.openTasks();
    await tasks.expectOnTasksPage();
  });

  test("swich to calendar view", async ({ page }) => {
    const tasks = new Tasks(page);
    const priority2TasksCount = await tasks.getPriority2TasksCount();
    // may need to add up all columns, only using priority 2 in this test
    await tasks.switchToCalendarView();
    await tasks.expectCalendarTasksCount(priority2TasksCount);
  });
  //   test("switch to list view", async ({ page }) => {
  //     const tasks = new Tasks(page);
  //     await tasks.switchToKanbanView();
  //   });
  test("switch to gantt chart view", async ({ page }) => {
    const tasks = new Tasks(page);
    const priority2TasksCount = await tasks.getPriority2TasksCount();
    // may need to add up all columns, only using priority 2 in this test
    await tasks.switchToGanttChartView();
    await tasks.expectGanttChartTasksCount(priority2TasksCount);
  });
  test("create and delete task", async ({ page }) => {
    const tasks = new Tasks(page);
    const taskName = faker.lorem.words({ min: 1, max: 5 });

    const priority2TasksCount = await tasks.getPriority2TasksCount();
    await tasks.createNewTask(taskName);
    const priority2TasksCountAfterCreate = await tasks.getPriority2TasksCount();
    expect(priority2TasksCountAfterCreate).toEqual(priority2TasksCount + 1);
    await tasks.deleteTask(taskName);
    await tasks.expectPriority2TasksCount(priority2TasksCount);
  });
});
