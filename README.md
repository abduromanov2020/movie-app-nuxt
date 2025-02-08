# GoodMoov - Movie Discovery App

A modern movie discovery application built with Nuxt 3, TypeScript, and Tailwind CSS. Browse trending movies, search by genre, and discover new films with a sleek, responsive interface.

## Features

- 🎬 Browse trending and popular movies
- 🔍 Search movies by genre
- 🌙 Dark/Light mode support
- ♾️ Infinite scroll for pagination
- 🎥 Watch movie trailers
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Nuxt 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **UI Components:** Headless UI
- **Icons:** Heroicons
- **API:** TMDB (The Movie Database)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- TMDB API Key (get it from [TMDB website](https://www.themoviedb.org/documentation/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-app-nuxt.git
cd movie-app-nuxt
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
NUXT_PUBLIC_API_BASE_URL=https://api.themoviedb.org/3
NUXT_PUBLIC_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
movie-app-nuxt/
├── components/
│   ├── common/          # Shared components
│   ├── movie/           # Movie-related components
│   ├── genre/           # Genre-related components
│   └── layout/          # Layout components
├── composables/         # Vue composables
├── pages/              # Application pages
├── stores/             # Pinia stores
├── types/              # TypeScript types
├── utils/              # Utility functions
└── server/             # Server-side code
```

## API Integration

The app uses TMDB API for movie data. All API calls are centralized in the `tmdb.ts` utility with proper error handling and type safety.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Nuxt.js](https://nuxt.com/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework