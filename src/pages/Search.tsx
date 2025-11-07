import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Movie } from '../types/movie'
import { tmdbService } from '../services/tmdb'
import { SearchMovieCard } from '../components/SearchMovieCard'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const searchMovies = async (
    searchQuery: string,
    pageNum: number,
    reset = false
  ) => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await tmdbService.searchMovies(searchQuery, pageNum)

      if (reset) {
        setMovies(response.results)
      } else {
        setMovies((prev) => [...prev, ...response.results])
      }

      setHasMore(pageNum < response.total_pages)
      setError(null)
    } catch (err) {
      setError('Erro ao buscar filmes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      setPage(1)
      searchMovies(query, 1, true)
    }
  }, [query])

  const loadMore = () => {
    if (!loading && hasMore && query) {
      const nextPage = page + 1
      setPage(nextPage)
      searchMovies(query, nextPage)
    }
  }

  if (!query) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-4xl font-bold mb-4 text-gradient'>Buscar Filmes</h1>
        <p className='text-gray-300'>
          Use a barra de busca para encontrar filmes
        </p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-2 text-gradient'>
        Resultados para: "{query}"
      </h1>

      {movies.length > 0 && (
        <p className='text-gray-300 mb-8'>{movies.length} filmes encontrados</p>
      )}

      {error && (
        <div className='text-center py-8'>
          <p className='text-red-400'>{error}</p>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
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

      <main
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6'
        role='main'
        aria-label={`Resultados da busca por ${query}`}>
        {movies.map((movie) => (
          <SearchMovieCard key={movie.id} movie={movie} searchTerm={query} />
        ))}
      </main>

      {loading && (
        <div className='text-center py-8' role='status' aria-live='polite'>
          <div
            className='inline-block animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-purple-500'
            aria-hidden='true'></div>
          <span className='sr-only'>Buscando filmes...</span>
        </div>
      )}

      {!loading && hasMore && movies.length > 0 && (
        <div className='text-center py-6 md:py-8'>
          <button
            onClick={loadMore}
            aria-label='Carregar mais resultados da busca'
            className='bg-gradient-primary hover:opacity-90 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-xl transition-all duration-200 font-medium'>
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  )
}
