import type { Genre, ReleaseDatesResponse } from '../types/movie'
import { tmdbService } from '../services/tmdb'

let genresCache: Genre[] | null = null

export const getGenres = async (): Promise<Genre[]> => {
  if (!genresCache) {
    genresCache = await tmdbService.getGenres()
  }
  return genresCache || []
}

export const getPrimaryGenre = async (genreIds: number[]): Promise<string> => {
  if (genreIds.length === 0) return 'Geral'

  const genres = await getGenres()
  const genre = genres.find((g) => g.id === genreIds[0])
  return genre?.name || 'Geral'
}

export const getCertification = async (movieId: number): Promise<string> => {
  try {
    const response: ReleaseDatesResponse =
      await tmdbService.getMovieReleaseDates(movieId)

    const brRelease = response.results.find((r) => r.iso_3166_1 === 'BR')
    if (brRelease?.release_dates[0]?.certification) {
      return brRelease.release_dates[0].certification
    }

    const usRelease = response.results.find((r) => r.iso_3166_1 === 'US')
    if (usRelease?.release_dates[0]?.certification) {
      return usRelease.release_dates[0].certification
    }

    return 'Livre'
  } catch {
    return 'Livre'
  }
}
