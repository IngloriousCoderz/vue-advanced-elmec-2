import { storeToRefs, defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { useListStore } from '../list/list'

export const useFiltersStore = defineStore('filters', () => {
  const list = useListStore()
  const { tasks } = storeToRefs(list)
  const { remove } = list

  const selectedFilter = ref('All')

  const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))
  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
  const tasksLeft = computed(() => activeTasks.value.length)
  const isClearCompletedShown = computed(() => !!completedTasks.value.length)

  const filteredTasks = computed(() => {
    if (selectedFilter.value === 'Active') return activeTasks.value
    if (selectedFilter.value === 'Completed') return completedTasks.value
    return tasks.value
  })

  function setFilter(value) {
    selectedFilter.value = value
  }

  function clearCompleted() {
    for (const task of completedTasks.value) {
      remove(tasks.value.indexOf(task))
    }
    selectedFilter.value = 'All'
  }

  return {
    selectedFilter,
    activeTasks,
    completedTasks,
    tasksLeft,
    isClearCompletedShown,
    filteredTasks,
    setFilter,
    clearCompleted,
  }
})
