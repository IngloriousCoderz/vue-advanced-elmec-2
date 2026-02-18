import { describe, it, expect } from 'vitest'

import { useForm } from './form'

describe('useForm', () => {
  it('starts with empty text', () => {
    const { text } = useForm()

    expect(text.value).toBe('')
  })

  it('empties the text', () => {
    // given
    const { text, empty } = useForm()
    text.value = 'Hello'

    // when
    empty()

    // then
    expect(text.value).toBe('')
  })
})
