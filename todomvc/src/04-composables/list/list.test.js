import { beforeEach, describe, it, expect, vi } from 'vitest'

describe('useList', () => {
  let composable = null

  beforeEach(async () => {
    vi.resetModules()
    const { useList } = await import('./list')
    composable = useList
  })

  it('starts with default tasks', async () => {
    const { tasks } = composable()

    expect(tasks.value).toHaveLength(3)
  })

  it('adds a task', async () => {
    const { tasks, add } = composable()

    add('New task')

    // expect(tasks.value).toHaveLength(4)
    // expect(tasks.value.at(-1).text).toBe('New task')

    expect(tasks.value).toEqual([
      { id: 1, text: 'Learn Vue', completed: true },
      { id: 2, text: 'Look for a job', completed: false },
      { id: 3, text: 'Forget everything' },
      { id: 4, text: 'New task' },
    ])

    // snapshot testing
    // expect(tasks.value).toMatchSnapshot()
  })

  it('toggles completion', async () => {
    const { tasks, toggle } = composable()
    const initial = tasks.value[1].completed

    toggle(1)

    expect(tasks.value[1].completed).toBe(!initial)
  })

  it('removes a task', async () => {
    const { tasks, remove } = composable()

    remove(0)

    expect(tasks.value).toHaveLength(2)
  })
})
