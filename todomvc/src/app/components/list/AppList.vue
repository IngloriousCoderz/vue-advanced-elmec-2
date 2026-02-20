<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useFiltersStore } from '../filters/filters'
import { useListStore } from './list'

const { fetch, toggle, remove } = useListStore()
const filters = useFiltersStore()
const { filteredTasks: tasks } = storeToRefs(filters)

onMounted(() => {
  fetch()
})
</script>

<template>
  <ul>
    <li v-for="(task, index) of tasks" :key="task.id">
      <span :class="{ completed: task.completed }" @click="toggle(index)">{{ task.text }}</span>
      &nbsp;
      <button @click="remove(index)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
