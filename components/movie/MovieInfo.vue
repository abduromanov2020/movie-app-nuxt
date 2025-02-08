<template>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-64 flex-shrink-0">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="w-full rounded-lg shadow-xl"
        />
      </div>
  
      <div class="flex-1 text-white">
        <h1 class="text-4xl font-bold mb-4">{{ movie.title }}</h1>
        <div class="flex items-center gap-4 mb-6">
          <span class="bg-violet-600 px-3 py-1 rounded-full text-sm font-semibold">
            {{ movie.vote_average?.toFixed(1) }}
          </span>
          <span>{{ formatDate(movie.release_date) }}</span>
          <span v-if="movie.runtime">{{ formatRuntime(movie.runtime) }}</span>
        </div>
        
        <div class="flex gap-2 mb-6">
          <NuxtLink
            v-for="genre in movie.genres"
            :key="genre.id"
            :to="`/genre/${genre.id}`"
            class="px-3 py-1 rounded-full bg-violet-600 text-white text-sm flex-shrink-0"
          >
            {{ genre.name }}
          </NuxtLink>
        </div>
  
        <p class="text-lg mb-6 dark:text-white text-violet-950">{{ movie.overview }}</p>
  
        <button
          v-if="trailer"
          @click="$emit('play-trailer')"
          class="inline-flex items-center px-6 py-3 bg-violet-600 dark:text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          <PlayIcon class="w-5 h-5 mr-2" />
          Watch Trailer
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { NuxtLink } from '#components';
import { PlayIcon } from '@heroicons/vue/24/outline';
import type { Movie, Video } from '~/types/movie';
  
  defineProps<{
    movie: Movie
    trailer: Video | null
  }>()
  
  defineEmits<{
    (e: 'play-trailer'): void
  }>()
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }
  </script>