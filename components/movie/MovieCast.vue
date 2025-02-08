<template>
    <section class="py-12">
      <div class="w-12 h-1 bg-violet-600 rounded-full mb-2" />
      <h2 class="text-xl font-semibold dark:text-white mb-6">Cast</h2>
      <div class="flex gap-4 overflow-x-auto scrollbar-custom">
        <div
          v-for="actor in cast"
          :key="actor.id"
          class="flex-shrink-0"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w300${actor.profile_path}`"
            :alt="actor.name"
            class="object-cover w-full h-[360px] rounded-lg" 
          />
          <div class="py-4">
            <h3 class="font-semibold dark:text-white">{{ actor.name }}</h3>
            <p class="text-sm text-gray-400">{{ actor.character }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import type { Cast } from '~/types/movie';
  
  defineProps<{
    cast: Cast[]
  }>()
  </script>