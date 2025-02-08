import { defineStore } from 'pinia'
import type { Genre, Movie, PaginatedResponse } from '~/types/movie'

interface MovieState {
    trending: Movie[]
    popular: Movie[]
    genres: Genre[]
    genreMovies: Movie[]
    loading: boolean
    currentPage: number
    totalPages: number
}

export const useMovieStore = defineStore('movie', {
    state: (): MovieState => ({
        trending: [],
        popular: [],
        genres: [],
        genreMovies: [],
        loading: false,
        currentPage: 1,
        totalPages: 1
    }),

    actions: {
        async fetchTrending() {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const response = await fetch(`${config.public.apiBaseUrl}/trending/movie/week?api_key=${config.public.apiKey}`)
                const data = await response.json() as PaginatedResponse<Movie>
                this.trending = data.results
            } catch (error) {
                throw createError({ statusCode: 500, message: 'Failed to fetch trending movies' })
            } finally {
                this.loading = false
            }
        },

        async fetchLatest() {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const response = await fetch(`${config.public.apiBaseUrl}/movie/now_playing?api_key=${config.public.apiKey}`)
                const data = await response.json() as PaginatedResponse<Movie>
                return data.results
            } catch (error) {
                throw createError({ statusCode: 500, message: 'Failed to fetch latest movies' })
            } finally {
                this.loading = false
            }
        },

        async fetchPopular(page = 1) {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const response = await fetch(`${config.public.apiBaseUrl}/movie/popular?api_key=${config.public.apiKey}&page=${page}`)
                const data = await response.json() as PaginatedResponse<Movie>

                if (page === 1) {
                    this.popular = data.results
                } else {
                    this.popular = [...this.popular, ...data.results]
                }

                this.currentPage = data.page
                this.totalPages = data.total_pages
            } catch (error) {
                throw createError({ statusCode: 500, message: 'Failed to fetch popular movies' })
            } finally {
                this.loading = false
            }
        },

        async fetchGenres() {
            try {
                const config = useRuntimeConfig()
                const response = await fetch(`${config.public.apiBaseUrl}/genre/movie/list?api_key=${config.public.apiKey}`)
                const data = await response.json()
                this.genres = data.genres
            } catch (error) {
                throw createError({ statusCode: 500, message: 'Failed to fetch genres' })
            }
        },

        async fetchMoviesByGenre(genreId: number, page = 1) {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const response = await fetch(`${config.public.apiBaseUrl}/discover/movie?api_key=${config.public.apiKey}&with_genres=${genreId}&page=${page}`)
                const data = await response.json() as PaginatedResponse<Movie>

                if (page === 1) {
                    this.genreMovies = data.results
                } else {
                    this.genreMovies = [...this.genreMovies, ...data.results]
                }

                this.currentPage = data.page
                this.totalPages = data.total_pages
            } catch (error) {
                throw createError({ statusCode: 500, message: 'Failed to fetch movies by genre' })
            } finally {
                this.loading = false
            }
        }
    }
})