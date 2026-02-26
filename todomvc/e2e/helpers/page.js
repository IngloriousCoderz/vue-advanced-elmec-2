export class TodoPage {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/')
  }

  // --- form ---
  get input() {
    return this.page.getByPlaceholder('What next?')
  }

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' })
  }

  async addTodo(text) {
    await this.input.fill(text)
    await this.addButton.click()
  }

  // --- list --
  get todos() {
    return this.page.getByRole('listitem')
  }

  todoText(index) {
    return this.todos.nth(index).locator('span')
  }

  removeButton(index) {
    return this.todos.nth(index).getByRole('button', { name: 'x' })
  }

  // --- filters ---
  get footer() {
    return this.page.locator('footer')
  }

  get itemsLeft() {
    return this.footer.getByText(/items left$/, { exact: false })
  }

  filter(name) {
    return this.footer.locator('.filters').getByText(name)
  }

  get clearCompleted() {
    return this.footer.getByText('Clear completed')
  }
}
