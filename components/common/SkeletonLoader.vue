<template>
    <div 
      class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
      :style="{ height: `${height}px` }"
    />
  </template>
  
  <script setup lang="ts">
  defineProps<{
    height: number
  }>()
  </script>