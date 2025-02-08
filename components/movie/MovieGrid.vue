<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      <template v-if="loading && !movies.length">
        <MovieCardSkeleton v-for="n in 10" :key="n" />
      </template>
      
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div
      v-if="hasMore"
      ref="infiniteScrollTrigger"
      class="h-20 flex items-center justify-center mt-8"
    >
      <div v-if="isLoadingMore" class="animate-spin rounded-full h-8 w-8 border-4 border-violet-600 border-t-transparent" />
    </div>

    <CommonErrorHandler
      v-if="error"
      :error="error"
      :onRetry="handleRetry"
      class="mt-8"
    />
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '~/composables/useInfiniteScroll'
import type { ErrorResponse, Movie } from '~/types/movie'

interface Props {
  movies: Movie[]
  loading: boolean
  hasMore: boolean
  error: ErrorResponse | null
  onLoadMore?: () => Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  hasMore: false,
  error: null
})

const isLoadingMore = ref(false)

const { target: infiniteScrollTrigger } = useInfiniteScroll(async () => {
  if (props.hasMore && !isLoadingMore.value && !props.error) {
    isLoadingMore.value = true
    try {
      await props.onLoadMore?.()
    } finally {
      isLoadingMore.value = false
    }
  }
})

const handleRetry = async () => {
  if (props.onLoadMore) {
    await props.onLoadMore()
  }
}
</script>