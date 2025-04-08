<script setup lang="ts">
onMounted(() => {
  store().defaultDarkMode();
  store().defaultTasks();
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>