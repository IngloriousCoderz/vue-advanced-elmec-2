import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useFiltersStore } from './filters'

describe('useFilters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('computes tasksLeft correctly', () => {
    const store = useFiltersStore()

    expect(store.tasksLeft).toBe(2)
  })

  it('filters active tasks', () => {
    const store = useFiltersStore()

    store.setFilter('Active')

    expect(store.filteredTasks.every((t) => !t.completed)).toBe(true)
  })

  it('filters completed tasks', () => {
    const store = useFiltersStore()

    store.setFilter('Completed')

    expect(store.filteredTasks.every((t) => t.completed)).toBe(true)
  })

  it('shows clear completed only when needed', () => {
    const store = useFiltersStore()

    expect(store.isClearCompletedShown).toBe(true)
  })

  it('clears completed tasks and resets filter', () => {
    const store = useFiltersStore()

    store.setFilter('Completed')
    store.clearCompleted()

    expect(store.filteredTasks.every((t) => !t.completed)).toBe(true)
    expect(store.selectedFilter).toBe('All')
  })
})
