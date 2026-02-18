import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('useFilters', () => {
  let composable = null

  beforeEach(async () => {
    vi.resetModules()
    const { useFilters } = await import('./filters')
    composable = useFilters
  })

  it('computes tasksLeft correctly', () => {
    const { tasksLeft } = composable()

    expect(tasksLeft.value).toBe(2)
  })

  it('filters active tasks', async () => {
    const { filteredTasks, setFilter } = composable()
    setFilter('Active')

    expect(filteredTasks.value.every((t) => !t.completed)).toBe(true)
  })

  it('filters completed tasks', async () => {
    const { filteredTasks, setFilter } = composable()
    setFilter('Completed')

    expect(filteredTasks.value.every((t) => t.completed)).toBe(true)
  })

  it('shows clear completed only when needed', async () => {
    const { isClearCompletedShown } = composable()
    expect(isClearCompletedShown.value).toBe(true)
  })

  it('clears completed tasks and resets filter', () => {
    const { filteredTasks, clearCompleted, selectedFilter, setFilter } = composable()

    setFilter('Completed')
    clearCompleted()

    expect(filteredTasks.value.every((t) => !t.completed)).toBe(true)
    expect(selectedFilter.value).toBe('All')
  })
})
