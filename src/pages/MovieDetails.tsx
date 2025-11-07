import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { MovieDetails as MovieDetailsType } from '../types/movie'
import { tmdbService } from '../services/tmdb'
import { useFavorites } from '../contexts/FavoritesContext'

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return

      try {
        setLoading(true)
        const movieData = await tmdbService.getMovieDetails(Number(id))
        setMovie(movieData)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar detalhes do filme')
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500'></div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <p className='text-red-400'>{error || 'Filme não encontrado'}</p>
      </div>
    )
  }

  const favorite = isFavorite(movie.id)

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <div className='container mx-auto px-4 py-6 md:py-8'>
      <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
        <div className='md:w-1/3 flex justify-center md:justify-start'>
          <img
            src={
              movie.poster_path
                ? tmdbService.getImageUrl(movie.poster_path, 'w780')
                : '/placeholder.jpg'
            }
            alt={movie.title}
            className='w-64 md:w-full rounded-xl shadow-2xl'
          />
        </div>

        <div className='md:w-2/3'>
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gradient text-center md:text-left'>
            {movie.title}
          </h1>

          <div className='flex flex-wrap gap-2 mb-4 md:mb-6 justify-center md:justify-start'>
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className='glass-effect border border-white/20 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm'>
                {genre.name}
              </span>
            ))}
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-3 md:gap-6 mb-6 md:mb-8 justify-center md:justify-start'>
            <div className='flex items-center glass-effect px-3 md:px-4 py-2 rounded-lg'>
              <span className='text-yellow-400 mr-2'>⭐</span>
              <span className='font-semibold text-white text-sm md:text-base'>
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className='text-gray-300 text-sm md:text-base'>
              {new Date(movie.release_date).toLocaleDateString('pt-BR')}
            </span>
            {movie.runtime && (
              <span className='text-gray-300 text-sm md:text-base'>
                {movie.runtime} min
              </span>
            )}
          </div>

          <p className='text-gray-300 mb-6 md:mb-8 leading-relaxed text-sm md:text-base lg:text-lg text-center md:text-left'>
            {movie.overview}
          </p>

          <div className='flex justify-center md:justify-start'>
            <button
              onClick={handleFavoriteClick}
              className={`px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl font-semibold transition-all duration-200 ${
                favorite
                  ? 'bg-gradient-secondary hover:opacity-90 text-white'
                  : 'bg-gradient-primary hover:opacity-90 text-white'
              }`}>
              {favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
