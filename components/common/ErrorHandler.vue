<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <Icon 
          :name="error.statusCode === 404 ? 'heroicons:exclamation-triangle' : 'heroicons:x-circle'"
          class="w-16 h-16 mx-auto text-red-500 mb-4"
        />
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ error.statusCode === 404 ? 'Not Found' : 'Something went wrong' }}
        </h2>
        
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ error.message || defaultMessage }}
        </p>
        
        <div class="flex justify-center space-x-4">
          <button
            @click="handleRetry"
            class="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Try Again
          </button>
          
          <NuxtLink
            to="/"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Go Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface ErrorProps {
    statusCode: number
    message?: string
  }
  
  const props = defineProps<{
    error: ErrorProps
    onRetry?: () => void
  }>()
  
  const defaultMessage = computed(() => {
    switch (props.error.statusCode) {
      case 404:
        return 'The page youre looking for doesnt exist or has been moved.'
      case 403:
        return 'You dont have permission to access this resource.'
      default:
        return 'We encountered an unexpected error. Please try again later.'
    }
  })
  
  const handleRetry = () => {
    if (props.onRetry) {
      props.onRetry()
    } else {
      window.location.reload()
    }
  }
  </script>