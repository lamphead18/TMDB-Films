import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SearchMovieCard } from '../components/SearchMovieCard'
import { FavoritesProvider } from '../contexts/FavoritesContext'
import type { Movie } from '../types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'Spider-Man: No Way Home',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 100,
  genre_ids: [28, 12],
}

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <FavoritesProvider>{component}</FavoritesProvider>
    </BrowserRouter>
  )
}

describe('SearchMovieCard', () => {
  test('highlights search term in movie title', () => {
    renderWithProviders(
      <SearchMovieCard movie={mockMovie} searchTerm='Spider' />
    )

    // Verifica se o termo está destacado
    const highlightedText = screen.getByText('Spider')
    expect(highlightedText).toHaveClass('bg-yellow-400')
  })

  test('renders title without highlight when no search term', () => {
    renderWithProviders(<SearchMovieCard movie={mockMovie} searchTerm='' />)

    expect(screen.getByText('Spider-Man: No Way Home')).toBeInTheDocument()
  })

  test('is case insensitive for highlighting', () => {
    renderWithProviders(
      <SearchMovieCard movie={mockMovie} searchTerm='spider' />
    )

    const highlightedText = screen.getByText('Spider')
    expect(highlightedText).toHaveClass('bg-yellow-400')
  })
})
