import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useListStore } from '../list/list'
import { defineStore } from 'pinia'

const selectedFilter = ref('All')

export const useFiltersStore = defineStore('filters', () => {
  const list = useListStore()
  const { tasks } = storeToRefs(list)
  const { remove } = list

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

  async function clearCompleted() {
    for (const task of completedTasks.value) {
      await remove(tasks.value.indexOf(task))
    }
    selectedFilter.value = 'All'
  }

  return {
    filteredTasks,
    tasksLeft,
    selectedFilter,
    setFilter,
    isClearCompletedShown,
    clearCompleted,
  }
})
