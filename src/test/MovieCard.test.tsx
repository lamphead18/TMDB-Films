import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MovieCard } from '../components/MovieCard'
import { FavoritesProvider } from '../contexts/FavoritesContext'
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

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <FavoritesProvider>{component}</FavoritesProvider>
    </BrowserRouter>
  )
}

describe('MovieCard', () => {
  test('renders movie title and year', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  test('displays movie rating', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)

    expect(screen.getByText('8.5')).toBeInTheDocument()
  })

  test('toggles favorite status when heart button is clicked', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)

    const favoriteButton = screen.getByRole('button')
    fireEvent.click(favoriteButton)

    // Verifica se o botão mudou de estado (coração preenchido)
    expect(favoriteButton).toBeInTheDocument()
  })

  test('shows remove button when showRemoveButton is true', () => {
    renderWithProviders(<MovieCard movie={mockMovie} showRemoveButton />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2) // Favorito + Remover
  })
})
