<template>
  <main class="min-h-screen dark:bg-gray-900 py-8 max-w-7xl mx-auto">
    <!-- Hero Carousel -->
    <section class="container mx-auto px-4 mb-8">
      <div v-if="loading" class="h-[40vh] bg-gray-800 rounded-lg animate-pulse" />
      <div v-else class="relative h-[40vh] rounded-lg overflow-hidden"> 
        <TransitionGroup name="fade">
          <div
            v-for="(movie, index) in trending"
            :key="movie.id"
            v-show="currentSlide === index"
            class="absolute inset-0"
          >
            <img
              :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
              :alt="movie.title"
              class="w-full h-full object-top object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
              <div class="absolute bottom-0 left-0 p-8">
                <h1 class="text-4xl font-bold text-white mb-4">{{ movie.title }}</h1>
                <p class="text-gray-200 text-lg max-w-2xl mb-6 line-clamp-2">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Carousel Navigation -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          <button
            v-for="(_, index) in trending"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-colors"
            :class="currentSlide === index ? 'bg-violet-600' : 'bg-white/50'"
          />
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 mb-8">
  <div class="flex gap-2 overflow-x-auto pb-4 scrollbar-custom">
    <NuxtLink
      v-for="genre in movieStore.genres"
      :key="genre.id"
      :to="`/genre/${genre.id}`"
      class="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 flex-shrink-0 bg-violet-600 text-white"
    >
      {{ genre.name }}
    </NuxtLink>
  </div>
</section>

    <!-- Popular Movies - Horizontal Scroll -->
    <section class="container mx-auto px-4 mb-12">
      <div class="w-12 h-1 bg-violet-600 rounded-full mb-2" />
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold dark:text-white">Popular</h2>
      </div>

      <div class="relative">
        <div 
          class="flex gap-4 overflow-x-auto pb-4 scrollbar-custom scroll-smooth"
          ref="popularScrollContainer"
        >
          <div v-if="loading" class="flex gap-4">
            <MovieCardSkeleton v-for="n in 5" :key="n" class="min-w-[240px]" />
          </div>
          <template v-else>
            <MovieCard
              v-for="movie in popular"
              :key="movie.id"
              :movie="movie"
              class="min-w-[240px]"
            />
          </template>
        </div>

      </div>
    </section>

    <!-- Latest Movies - Horizontal Scroll -->
    <section class="container mx-auto px-4 mb-12">
      <div class="w-12 h-1 bg-violet-600 rounded-full mb-2" />
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold dark:text-white">Latest</h2>
      </div>

      <div class="relative">
        <div 
          class="flex gap-4 overflow-x-auto pb-4 scrollbar-custom scroll-smooth"
          ref="latestScrollContainer"
        >
          <div v-if="loading" class="flex gap-4">
            <MovieCardSkeleton v-for="n in 5" :key="n" class="min-w-[240px]" />
          </div>
          <template v-else>
            <MovieCard
              v-for="movie in latestMovies"
              :key="movie.id"
              :movie="movie"
              class="min-w-[240px]"
            />
          </template>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/vue/24/outline'

const movieStore = useMovieStore()
const { trending, popular, loading, currentPage, totalPages } = storeToRefs(movieStore)

const currentSlide = ref(0)
const selectedCategory = ref('Action')
const categories = ['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Horror']
const error = ref(null)

const latestMovies = ref([])


const fetchInitialData = async () => {
  error.value = null
  try {
    const [trendingData, popularData, latestData] = await Promise.all([
      movieStore.fetchTrending(),
      movieStore.fetchPopular(),
      movieStore.fetchLatest(),
      movieStore.fetchGenres()
    ])
    latestMovies.value = latestData
  } catch (err) {
    error.value = {
      statusCode: err.statusCode || 500,
      message: err.message || 'Failed to fetch movies'
    }
  }
}

onMounted(fetchInitialData)
</script>

