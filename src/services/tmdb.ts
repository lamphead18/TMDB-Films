import axios from 'axios'
import type { Movie, MovieDetails, TMDBResponse } from '../types/movie'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
})

export const tmdbService = {
  getPopularMovies: (page = 1): Promise<TMDBResponse<Movie>> =>
    api.get('/movie/popular', { params: { page } }).then((res) => res.data),

  searchMovies: (query: string, page = 1): Promise<TMDBResponse<Movie>> =>
    api
      .get('/search/movie', { params: { query, page } })
      .then((res) => res.data),

  getMovieDetails: (id: number): Promise<MovieDetails> =>
    api.get(`/movie/${id}`).then((res) => res.data),

  getMovieReleaseDates: (id: number) =>
    api.get(`/movie/${id}/release_dates`).then((res) => res.data),

  getGenres: () => api.get('/genre/movie/list').then((res) => res.data.genres),

  getImageUrl: (path: string, size = 'w300') =>
    `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`,
}
