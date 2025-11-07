// Mock do tmdbService
jest.mock('../services/tmdb', () => ({
  tmdbService: {
    getGenres: jest.fn().mockResolvedValue([
      { id: 28, name: 'Ação' },
      { id: 12, name: 'Aventura' },
    ]),
    getMovieReleaseDates: jest.fn().mockResolvedValue({
      results: [
        {
          iso_3166_1: 'BR',
          release_dates: [{ certification: '12' }],
        },
      ],
    }),
  },
}))

import { getPrimaryGenre, getCertification } from '../utils/movieUtils'

describe('movieUtils', () => {
  test('getPrimaryGenre returns correct genre name', async () => {
    const result = await getPrimaryGenre([28, 12])
    expect(result).toBe('Ação')
  })

  test('getPrimaryGenre returns "Geral" for empty array', async () => {
    const result = await getPrimaryGenre([])
    expect(result).toBe('Geral')
  })

  test('getCertification returns Brazilian certification', async () => {
    const result = await getCertification(123)
    expect(result).toBe('12')
  })
})
