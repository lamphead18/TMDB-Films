import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, Star } from 'lucide-react'
import type { Movie } from '../types/movie'
import { useFavorites } from '../contexts/FavoritesContext'
import { tmdbService } from '../services/tmdb'
import { getPrimaryGenre, getCertification } from '../utils/movieUtils'

interface MovieCardProps {
  movie: Movie
  showRemoveButton?: boolean
}

export const MovieCard = ({
  movie,
  showRemoveButton = false,
}: MovieCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const [genre, setGenre] = useState<string>('Geral')
  const [certification, setCertification] = useState<string>('Livre')

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [genreName, cert] = await Promise.all([
          getPrimaryGenre(movie.genre_ids),
          getCertification(movie.id),
        ])
        setGenre(genreName)
        setCertification(cert)
      } catch {}
    }

    loadMovieData()
  }, [movie.id, movie.genre_ids])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <div className='glass-effect rounded-lg md:rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/10 flex flex-col h-full'>
      <Link
        to={`/movie/${movie.id}`}
        className='flex-1 flex flex-col'
        aria-label={`Ver detalhes do filme ${movie.title}`}>
        <div className='relative aspect-[2/3] overflow-hidden'>
          <img
            src={
              movie.poster_path
                ? tmdbService.getImageUrl(movie.poster_path, 'w500')
                : '/placeholder.jpg'
            }
            alt={`Pôster do filme ${movie.title}`}
            className='w-full h-full object-cover'
          />
          <div
            className='absolute top-1 md:top-2 right-1 md:right-2 bg-black/70 backdrop-blur-sm text-white px-1 md:px-2 py-0.5 md:py-1 rounded md:rounded-lg text-xs md:text-sm flex items-center gap-0.5 md:gap-1'
            aria-label={`Avaliação: ${movie.vote_average.toFixed(1)} de 10`}>
            <Star
              className='w-2 h-2 md:w-3 md:h-3 fill-yellow-400 text-yellow-400'
              aria-hidden='true'
            />
            {movie.vote_average.toFixed(1)}
          </div>
          <button
            onClick={handleFavoriteClick}
            aria-label={
              favorite
                ? `Remover ${movie.title} dos favoritos`
                : `Adicionar ${movie.title} aos favoritos`
            }
            className={`absolute bottom-1 md:bottom-2 right-1 md:right-2 p-1 md:p-2 rounded-full bg-black/70 backdrop-blur-sm transition-all duration-200 ${
              favorite
                ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20'
                : 'text-gray-400 hover:text-red-400 hover:bg-white/10'
            }`}>
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 ${
                favorite ? 'fill-current' : ''
              }`}
              aria-hidden='true'
            />
          </button>
        </div>
        <div className='p-2 md:p-4 flex-1 flex flex-col'>
          <h3 className='font-semibold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2 text-white flex-1'>
            {movie.title}
          </h3>
          <div className='flex items-center justify-between text-xs md:text-sm'>
            <span className='text-gray-400'>
              {new Date(movie.release_date).getFullYear()}
            </span>
            <div className='flex items-center gap-1 md:gap-2'>
              <span className='text-gray-400 border border-gray-500 px-1 py-0.5 rounded text-xs'>
                {genre}
              </span>
              <span className='text-gray-400 border border-gray-500 px-1 py-0.5 rounded text-xs'>
                {certification}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {showRemoveButton && (
        <div className='px-2 md:px-4 pb-2 md:pb-4 flex justify-end mt-auto'>
          <button
            onClick={(e) => {
              e.preventDefault()
              removeFavorite(movie.id)
            }}
            aria-label={`Remover ${movie.title} dos favoritos`}
            className='text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 md:p-2 rounded-full transition-all duration-200'>
            <Trash2 className='w-4 h-4 md:w-5 md:h-5' aria-hidden='true' />
          </button>
        </div>
      )}
    </div>
  )
}
