import { test, expect } from '@playwright/test'

import { mockTasksApi } from './helpers/api'
import { TodoPage } from './helpers/page'

test.describe('Todo App', () => {
  let todoPage = null

  test.beforeEach(async ({ page }) => {
    await mockTasksApi(page, [
      { id: '1', text: 'Learn Vue', completed: true },
      { id: '2', text: 'Look for a job', completed: false },
      { id: '3', text: 'Forget everything' },
    ])

    todoPage = new TodoPage(page)
    await todoPage.goto()
  })

  test('renders initial state', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText("Matteo Antony's Todo List")

    await expect(todoPage.todos).toHaveCount(3)
    await expect(todoPage.itemsLeft).toHaveText('2 items left')
  })

  test('add button is disabled when input is empty', async () => {
    await expect(todoPage.addButton).toBeDisabled()

    await todoPage.input.fill('Something')

    await expect(todoPage.addButton).toBeEnabled()
  })

  test('adds a new todo', async () => {
    await todoPage.addTodo('Write Playwright Tests')

    await expect(todoPage.todos).toHaveCount(4)
    await expect(todoPage.todoText(3)).toHaveText('Write Playwright Tests')
    await expect(todoPage.itemsLeft).toHaveText('3 items left')
  })

  test('toggles todo completion', async () => {
    const firstTodo = todoPage.todoText(0)
    await expect(firstTodo).toHaveClass(/completed/)

    await firstTodo.click()

    await expect(firstTodo).not.toHaveClass(/completed/)
    await expect(todoPage.itemsLeft).toHaveText('3 items left')
  })

  test('removes a todo', async () => {
    await todoPage.removeButton(1).click()

    await expect(todoPage.todos).toHaveCount(2)
    await expect(todoPage.itemsLeft).toHaveText('1 items left')
  })

  test('filters active todos', async () => {
    await todoPage.filter('Active').click()

    await expect(todoPage.todos).toHaveCount(2)
    await expect(todoPage.todoText(0)).not.toHaveClass(/completed/)
  })

  test('filters completed todos', async () => {
    await todoPage.filter('Completed').click()

    await expect(todoPage.todos).toHaveCount(1)
    await expect(todoPage.todoText(0)).toHaveClass(/completed/)
  })

  test('clears completed todos', async () => {
    await expect(todoPage.clearCompleted).toBeVisible()

    await todoPage.clearCompleted.click()

    await expect(todoPage.todos).toHaveCount(2)
    await expect(todoPage.itemsLeft).toHaveText('2 items left')
  })

  test("clear completed resets filter to 'All'", async () => {
    await todoPage.filter('Completed').click()

    await todoPage.clearCompleted.click()

    await expect(todoPage.todos).toHaveCount(2)
  })
})
