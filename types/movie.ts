export interface Movie {
    id: number
    title: string
    poster_path: string
    backdrop_path?: string
    vote_average: number
    release_date: string
    runtime?: number
    overview?: string
    genres?: Genre[]
}

export interface Genre {
    id: number
    name: string
}

export interface Cast {
    id: number
    name: string
    character: string
    profile_path: string
}

export interface Video {
    key: string
    type: string
    site: string
}

export interface ErrorResponse {
    statusCode: number
    message?: string
}

export interface PaginatedResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}