<template>
    <header class="sticky top-0 z-50 dark:bg-[#171717] border-b dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center">
        <NuxtLink to="/" class="mr-4">
          <ChevronLeftIcon class="w-6 h-6 dark:text-white" />
        </NuxtLink>
        <h1 class="text-xl font-medium dark:text-white">{{ genreName }}</h1>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
  
  defineProps<{
    genreName?: string
  }>()</script>