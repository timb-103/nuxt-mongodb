<template>
  <h1>MongoDB Playground!!</h1>
</template>

<script setup lang="ts">
import { onMounted } from '#imports'

onMounted(() => $fetch('/api/hello'))
</script>
