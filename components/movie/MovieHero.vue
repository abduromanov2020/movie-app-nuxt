<template>
    <section class="relative h-[70vh] md:block hidden">
      <img
        :src="`https://image.tmdb.org/t/p/original${backdropPath}`"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900" />
    </section>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    backdropPath: string
    title: string
  }>()
  </script>