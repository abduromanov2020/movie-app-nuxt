import type { Cast, Movie, Video } from '~/types/movie'

export const useMovieDetail = (movieId: string | number) => {
    const movie = ref<Movie | null>(null)
    const cast = ref<Cast[]>([])
    const similar = ref<Movie[]>([])
    const trailer = ref<Video | null>(null)
    const loading = ref(true)
    const error = ref<Error | null>(null)

    const fetchMovieData = async () => {
        loading.value = true
        error.value = null

        try {
            const config = useRuntimeConfig()
            const [movieData, creditsData, videosData, similarData] = await Promise.all([
                fetch(`${config.public.apiBaseUrl}/movie/${movieId}?api_key=${config.public.apiKey}`).then(r => r.json()),
                fetch(`${config.public.apiBaseUrl}/movie/${movieId}/credits?api_key=${config.public.apiKey}`).then(r => r.json()),
                fetch(`${config.public.apiBaseUrl}/movie/${movieId}/videos?api_key=${config.public.apiKey}`).then(r => r.json()),
                fetch(`${config.public.apiBaseUrl}/movie/${movieId}/similar?api_key=${config.public.apiKey}`).then(r => r.json())
            ])

            movie.value = movieData
            cast.value = creditsData.cast?.slice(0, 6) ?? []
            similar.value = similarData.results?.slice(0, 6) ?? []
            trailer.value = videosData.results?.find(
                (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
            ) ?? null
        } catch (err) {
            error.value = err as Error
            throw createError({
                statusCode: 500,
                message: 'Failed to fetch movie details'
            })
        } finally {
            loading.value = false
        }
    }

    return {
        movie,
        cast,
        similar,
        trailer,
        loading,
        error,
        fetchMovieData
    }
}