<script setup>
import { useList } from '../list/list'
import { useForm } from './form'

const { text, empty } = useForm()
const { add } = useList()

function handleSubmit() {
  add(text.value)
  empty()
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="What next?" autofocus v-model="text" />
    <button :disabled="!text">Add</button>
  </form>
</template>
