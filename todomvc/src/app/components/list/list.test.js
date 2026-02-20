import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { useListStore } from './list'
import * as api from '../../services/api'

vi.mock('../../services/api', () => ({
  fetchTasks: vi.fn(),
  addTask: vi.fn(),
  replaceTask: vi.fn(),
  updateTask: vi.fn(),
  removeTask: vi.fn(),
}))

describe('useListStore', () => {
  const mockTasks = [
    { id: 1, text: 'Learn Vue', completed: true },
    { id: 2, text: 'Look for a job', completed: false },
    { id: 3, text: 'Forget everything' },
  ]
  let store = null

  beforeEach(async () => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    api.fetchTasks.mockResolvedValue(JSON.parse(JSON.stringify(mockTasks)))
    store = useListStore()

    await store.fetch()
  })

  it('starts with default tasks', async () => {
    expect(store.tasks).toHaveLength(3)
  })

  it('adds a task', async () => {
    const newTask = { id: 4, text: 'New task' }
    api.addTask.mockResolvedValue(newTask)

    await store.add('New task')

    // expect(tasks.value).toHaveLength(4)
    // expect(tasks.value.at(-1).text).toBe('New task')

    expect(store.tasks).toEqual([
      { id: 1, text: 'Learn Vue', completed: true },
      { id: 2, text: 'Look for a job', completed: false },
      { id: 3, text: 'Forget everything' },
      { id: 4, text: 'New task' },
    ])

    // snapshot testing
    // expect(tasks.value).toMatchSnapshot()
  })

  it('toggles completion', async () => {
    const updatedTask = { ...mockTasks[1], completed: true }
    api.updateTask.mockResolvedValue(updatedTask)

    await store.toggle(1)

    expect(store.tasks[1].completed).toBe(updatedTask.completed)
  })

  it('removes a task', async () => {
    api.removeTask.mockResolvedValue({})

    await store.remove(0)

    expect(store.tasks).toHaveLength(2)
  })
})
