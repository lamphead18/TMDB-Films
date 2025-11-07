export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  genres?: Genre[]
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number
  budget: number
  revenue: number
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface ReleaseDate {
  certification: string
  iso_639_1: string
  note?: string
  release_date: string
  type: number
}

export interface ReleaseDateResult {
  iso_3166_1: string
  release_dates: ReleaseDate[]
}

export interface ReleaseDatesResponse {
  id: number
  results: ReleaseDateResult[]
}
