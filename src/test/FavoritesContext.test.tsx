import { render, screen, fireEvent } from '@testing-library/react'
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext'
import type { Movie } from '../types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 100,
  genre_ids: [28, 12],
}

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  return (
    <div>
      <span data-testid='favorites-count'>{favorites.length}</span>
      <span data-testid='is-favorite'>{isFavorite(1) ? 'true' : 'false'}</span>
      <button onClick={() => addFavorite(mockMovie)}>Add Favorite</button>
      <button onClick={() => removeFavorite(1)}>Remove Favorite</button>
    </div>
  )
}

describe('FavoritesContext', () => {
  test('starts with empty favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false')
  })

  test('adds movie to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    fireEvent.click(screen.getByText('Add Favorite'))

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('true')
  })

  test('removes movie from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    // Adiciona primeiro
    fireEvent.click(screen.getByText('Add Favorite'))

    // Remove depois
    fireEvent.click(screen.getByText('Remove Favorite'))
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false')
  })
})
