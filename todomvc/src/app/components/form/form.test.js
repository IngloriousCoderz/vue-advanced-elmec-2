import { beforeEach, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useFormStore } from './form'

describe('useForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty text', () => {
    const store = useFormStore()

    expect(store.text).toBe('')
  })

  it('empties the text', () => {
    // given
    const store = useFormStore()
    store.text = 'Hello'

    // when
    store.empty()

    // then
    expect(store.text).toBe('')
  })
})
