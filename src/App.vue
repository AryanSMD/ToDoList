<script setup lang="ts">
import { onMounted } from 'vue';
import Default from './layouts/Default.vue';
import { useTasksStore } from './stores/tasks';

const store = useTasksStore();
onMounted(() => {
  store.getTasks();
  store.getMode();
})
</script>

<template>
  <Default />
</template>