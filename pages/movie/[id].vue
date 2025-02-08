<template>
  <main class="min-h-screen dark:bg-gray-900">
    <div v-if="loading" class="container mx-auto px-4 py-8">
      <MovieCardSkeleton class="w-full h-[70vh]" />
    </div>

    <template v-else-if="error">
      <ErrorHandler :error="error" />
    </template>

    <div v-else-if="movie" class="relative">
      <MovieHero 
        :backdrop-path="movie.backdrop_path!" 
        :title="movie.title" 
      />

      <div class="relative container mx-auto px-4 mt-4 md:-mt-32">
        <MovieInfo 
          :movie="movie" 
          :trailer="trailer" 
          @play-trailer="showTrailer = true" 
        />

        <MovieCast :cast="cast" />

        <section class="py-12">
          <div class="w-12 h-1 bg-violet-600 rounded-full mb-2" />
          <h2 class="text-xl font-semibold dark:text-white mb-6">Similar Movies</h2>
          <div class="relative">
            <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-custom">
              <MovieCard
                v-for="similarMovie in similar"
                :key="similarMovie.id"
                :movie="similarMovie"
                class="min-w-[240px]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>

    <MovieTrailerModal
      :show="showTrailer"
      :video-key="trailer?.key ?? ''"
      @close="showTrailer = false"
    />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const showTrailer = ref(false)

const {
  movie,
  cast,
  similar,
  trailer,
  loading,
  error,
  fetchMovieData
} = useMovieDetail(movieId)

onMounted(fetchMovieData)

watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchMovieData()
  }
})
</script>