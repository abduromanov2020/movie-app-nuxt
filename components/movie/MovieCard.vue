<template>
  <NuxtLink :to="`/movie/${movie.id}`">
    <div class="relative group cursor-pointer">
      <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <img
          :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
          :alt="movie.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-0 right-0 z-10 bg-slate-950/80 text-white px-3 py-2 text-sm">
          {{ movie.vote_average.toFixed(1) }}
        </div>
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div class="mt-2">
        <h3 class="dark:text-white truncate">{{ movie.title }}</h3>
        <div class="flex items-center">
          <span class="dark:text-white text-sm">{{ movie.release_date.split('-')[0] }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Movie } from '~/types/movie';

defineProps<{
  movie: Movie
}>()</script>