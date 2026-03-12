import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useList', () => {
  let composable = null

  beforeEach(async () => {
    vi.resetModules()
    const { useList } = await import('./list')
    composable = useList
  })

  it('starts with default tasks', () => {
    const { tasks } = composable()

    expect(tasks.value).toMatchSnapshot()
  })

  it('adds a task', () => {
    const { tasks, add } = composable()

    add('New task')

    expect(tasks.value).toMatchSnapshot()
  })

  it('toggles completion', () => {
    const { tasks, toggle } = composable()

    toggle(1)

    expect(tasks.value).toMatchSnapshot()
  })

  it('removes a task', () => {
    const { tasks, remove } = composable()

    remove(0)

    expect(tasks.value).toMatchSnapshot()
  })
})
