import type { Movie, PaginatedResponse } from '~/types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const fetchFromTMDB = async <T>(endpoint: string): Promise<T> => {
    const config = useRuntimeConfig()
    const url = `${BASE_URL}${endpoint}`

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${config.tmdbApiKey}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: response.statusText,
                message: `TMDB API error: ${response.status} ${response.statusText}`
            })
        }

        return response.json()
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch data from TMDB'
        })
    }
}

export const getImageUrl = (path: string | null, size: string = 'original'): string | null => {
    if (!path) return null
    return `${IMAGE_BASE_URL}/${size}${path}`
}

export const fetchMovies = async (endpoint: string): Promise<PaginatedResponse<Movie>> => {
    return fetchFromTMDB<PaginatedResponse<Movie>>(endpoint)
}

export const MovieImageSizes = {
    poster: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        original: 'original'
    },
    backdrop: {
        small: 'w300',
        medium: 'w780',
        large: 'w1280',
        original: 'original'
    }
} as const