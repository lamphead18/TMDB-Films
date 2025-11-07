import { useState, useEffect } from 'react'
import type { Movie } from '../types/movie'
import { tmdbService } from '../services/tmdb'
import { MovieCard } from '../components/MovieCard'
import { SearchMovieCard } from '../components/SearchMovieCard'
import { useSearch } from '../contexts/SearchContext'

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { searchQuery, searchResults, isSearching } = useSearch()

  const loadMovies = async (pageNum: number, reset = false) => {
    try {
      setLoading(true)
      const response = await tmdbService.getPopularMovies(pageNum)

      if (reset) {
        setMovies(response.results)
      } else {
        setMovies((prev) => [...prev, ...response.results])
      }

      setHasMore(pageNum < response.total_pages)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar filmes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies(1, true)
  }, [])

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadMovies(nextPage)
    }
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <p className='text-red-400'>{error}</p>
      </div>
    )
  }

  const isSearchActive = searchQuery.trim().length >= 1
  const displayMovies = isSearchActive ? searchResults : movies
  const isLoading = isSearchActive ? isSearching : loading
  const title = isSearchActive
    ? `Resultados para "${searchQuery}"`
    : 'Filmes Populares'

  return (
    <div className='container mx-auto px-4 py-6 md:py-8'>
      <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-gradient text-center md:text-left'>
        {title}
      </h1>

      <main
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6'
        role='main'
        aria-label='Lista de filmes'>
        {displayMovies.map((movie) =>
          isSearchActive ? (
            <SearchMovieCard
              key={movie.id}
              movie={movie}
              searchTerm={searchQuery}
            />
          ) : (
            <MovieCard key={movie.id} movie={movie} />
          )
        )}
      </main>

      {isLoading && (
        <div className='text-center py-8' role='status' aria-live='polite'>
          <div
            className='inline-block animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-purple-500'
            aria-hidden='true'></div>
          <span className='sr-only'>Carregando filmes...</span>
        </div>
      )}

      {!isSearchActive && !loading && hasMore && (
        <div className='text-center py-6 md:py-8'>
          <button
            onClick={loadMore}
            aria-label='Carregar mais filmes'
            className='bg-gradient-primary hover:opacity-90 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-xl transition-all duration-200 font-medium'>
            Carregar Mais
          </button>
        </div>
      )}

      {isSearchActive && !isSearching && displayMovies.length === 0 && (
        <div className='text-center py-8'>
          <div className='glass-effect p-8 rounded-2xl border border-white/10 max-w-md mx-auto'>
            <div className='text-6xl mb-4'>🔍</div>
            <h2 className='text-2xl font-bold mb-4 text-gradient'>
              Nenhum filme encontrado
            </h2>
            <p className='text-gray-300'>
              Tente buscar com outros termos ou verifique a ortografia
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
