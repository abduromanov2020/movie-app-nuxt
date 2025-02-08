import type { Genre, Movie, PaginatedResponse } from '~/types/movie'

export const useGenreMovies = (genreId: number) => {
    const movies = ref<Movie[]>([])
    const currentGenre = ref<Genre | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const currentPage = ref(1)
    const totalPages = ref(1)

    const fetchGenreMovies = async (page = 1) => {
        loading.value = true
        error.value = null

        try {
            const config = useRuntimeConfig()
            const response = await fetch(
                `${config.public.apiBaseUrl}/discover/movie?api_key=${config.public.apiKey}&with_genres=${genreId}&page=${page}`
            )
            const data = await response.json() as PaginatedResponse<Movie>

            if (page === 1) {
                movies.value = data.results
            } else {
                movies.value = [...movies.value, ...data.results]
            }

            currentPage.value = data.page
            totalPages.value = data.total_pages
        } catch (err) {
            error.value = err as Error
            throw createError({
                statusCode: 500,
                message: 'Failed to fetch genre movies'
            })
        } finally {
            loading.value = false
        }
    }

    const loadMore = async () => {
        if (currentPage.value < totalPages.value && !loading.value) {
            await fetchGenreMovies(currentPage.value + 1)
        }
    }

    const updateCurrentGenre = (genres: Genre[]) => {
        currentGenre.value = genres.find(genre => genre.id === genreId) ?? null
    }

    return {
        movies,
        currentGenre,
        loading,
        error,
        currentPage,
        totalPages,
        fetchGenreMovies,
        loadMore,
        updateCurrentGenre
    }
}