<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <nav class="container px-4 py-4 max-w-7xl mx-auto">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <NuxtLink to="/" class="text-2xl font-bold text-violet-600 hover:text-violet-700">
              Good
              <span class="dark:text-slate-200 text-slate-700 underline decoration-violet-600 underline-offset-4">Moov</span> 
            </NuxtLink>
  
            <!-- Search & Theme Toggle -->
            <div class="flex items-center space-x-4">
  
              <!-- Theme Toggle -->
              <button
                class="p-2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
                @click="toggleColorMode"
              >
                <!-- Sun icon -->
                <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                </svg>
                <!-- Moon icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
  
      <!-- Main Content -->
      <main class="flex-1 bg-gray-100 dark:bg-gray-900">
        <NuxtPage />
      </main>
  
      <!-- Footer -->
      <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {{ new Date().getFullYear() }} MovieApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  const colorMode = useColorMode()
  const searchQuery = ref('')
  const router = useRouter()
  
  const toggleColorMode = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  }
  
  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
      searchQuery.value = ''
    }
  }
  </script>