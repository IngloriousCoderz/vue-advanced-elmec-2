<script setup>
import ic from '@/assets/logo.png?w=64&format=webp'
import governo from '@/assets/governo.svg'

defineProps(['name'])
</script>

<template>
  <h1>{{ name }}'s Todo List</h1>
  <img :src="ic" alt="ic-logo" width="64" />
  <img :src="governo" alt="governo-logo" width="64" />
</template>
