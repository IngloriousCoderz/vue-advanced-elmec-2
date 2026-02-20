import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', () => {
  const errors = ref([])

  function addError(error) {
    errors.value.push({
      ...error,
      id: Date.now(),
    })
  }

  function clearError(id) {
    errors.value = errors.value.filter((e) => e.id !== id)
  }

  return { errors, addError, clearError }
})
