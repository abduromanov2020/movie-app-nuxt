<template>
  <main class="min-h-screen dark:bg-[#171717]">
    <GenreHeader :genre-name="currentGenre?.name" />

    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <div 
        v-if="loading" 
        class="py-8 text-center"
      >
        <div class="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>

      <div 
        v-if="!loading && !error"
        ref="infiniteScrollTarget"
        class="h-20"
      />
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const movieStore = useMovieStore()
const genreId = computed(() => Number(route.params.id))

const {
  movies,
  currentGenre,
  loading,
  error,
  fetchGenreMovies,
  loadMore,
  updateCurrentGenre
} = useGenreMovies(genreId.value)

const { target: infiniteScrollTarget } = useInfiniteScroll(async () => {
  if (!loading.value && !error.value) {
    await loadMore()
  }
})

onMounted(async () => {
  if (movieStore.genres.length === 0) {
    await movieStore.fetchGenres()
  }
  updateCurrentGenre(movieStore.genres)
  await fetchGenreMovies()
})

watch(() => route.params.id, async (newId) => {
  if (newId) {
    updateCurrentGenre(movieStore.genres)
    await fetchGenreMovies()
  }
})
</script>