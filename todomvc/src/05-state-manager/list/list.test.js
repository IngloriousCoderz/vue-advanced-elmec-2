import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useListStore } from './list'

describe('useList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with default tasks', () => {
    const store = useListStore()

    expect(store.tasks).toMatchSnapshot()
  })

  it('adds a task', () => {
    const store = useListStore()

    store.add('New task')

    expect(store.tasks).toMatchSnapshot()
  })

  it('toggles completion', () => {
    const store = useListStore()

    store.toggle(1)

    expect(store.tasks).toMatchSnapshot()
  })

  it('removes a task', () => {
    const store = useListStore()

    store.remove(0)

    expect(store.tasks).toMatchSnapshot()
  })
})
