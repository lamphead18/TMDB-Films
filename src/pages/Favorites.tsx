import { useState } from 'react'
import { useFavorites } from '../contexts/FavoritesContext'
import { MovieCard } from '../components/MovieCard'

type SortOption = 'title-asc' | 'title-desc' | 'rating-desc' | 'rating-asc'

export const Favorites = () => {
  const { favorites } = useFavorites()
  const [sortBy, setSortBy] = useState<SortOption>('title-asc')

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      case 'rating-desc':
        return b.vote_average - a.vote_average
      case 'rating-asc':
        return a.vote_average - b.vote_average
      default:
        return 0
    }
  })

  if (favorites.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <div className='max-w-md mx-auto glass-effect p-8 rounded-2xl border border-white/10'>
          <div className='text-6xl mb-4'>🎬</div>
          <h2 className='text-2xl font-bold mb-4 text-gradient'>
            Nenhum filme favorito
          </h2>
          <p className='text-gray-300 mb-6'>
            Você ainda não adicionou nenhum filme aos seus favoritos. Explore
            nossa coleção e adicione filmes que você gosta!
          </p>
          <a
            href='/'
            className='bg-gradient-primary hover:opacity-90 text-white px-6 py-3 rounded-xl inline-block transition-all duration-200 font-medium'>
            Explorar Filmes
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6 md:py-8'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8'>
        <h1 className='text-2xl md:text-4xl font-bold text-gradient'>
          Meus Favoritos ({favorites.length})
        </h1>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className='glass-effect text-white px-3 md:px-4 py-2 text-sm md:text-base border border-white/20 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all w-full sm:w-auto'>
          <option value='title-asc' className='bg-gray-800'>
            Título (A-Z)
          </option>
          <option value='title-desc' className='bg-gray-800'>
            Título (Z-A)
          </option>
          <option value='rating-desc' className='bg-gray-800'>
            Maior Nota
          </option>
          <option value='rating-asc' className='bg-gray-800'>
            Menor Nota
          </option>
        </select>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6'>
        {sortedFavorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showRemoveButton />
        ))}
      </div>
    </div>
  )
}
