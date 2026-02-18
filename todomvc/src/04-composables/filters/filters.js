import { ref, computed } from 'vue'
import { useList } from '../list/list'

const selectedFilter = ref('All')

export function useFilters() {
  const { tasks, remove } = useList()

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
    filteredTasks,
    tasksLeft,
    selectedFilter,
    setFilter,
    isClearCompletedShown,
    clearCompleted,
  }
}
