import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Movie } from '../types/movie'

interface FavoritesContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('tmdb-favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie]
    setFavorites(newFavorites)
    localStorage.setItem('tmdb-favorites', JSON.stringify(newFavorites))
  }

  const removeFavorite = (movieId: number) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId)
    setFavorites(newFavorites)
    localStorage.setItem('tmdb-favorites', JSON.stringify(newFavorites))
  }

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
