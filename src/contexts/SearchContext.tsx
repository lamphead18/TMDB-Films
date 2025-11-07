import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Movie } from '../types/movie'
import { tmdbService } from '../services/tmdb'
import { useDebounce } from '../hooks/useDebounce'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Movie[]
  isSearching: boolean
  suggestions: Movie[]
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearch.trim().length >= 1) {
        setIsSearching(true)
        try {
          const response = await tmdbService.searchMovies(debouncedSearch, 1)
          setSearchResults(response.results)

          // Criar sugestões com filmes completos (sempre os primeiros 5)
          const movieSuggestions = response.results.slice(0, 5)
          setSuggestions(movieSuggestions)
        } catch {
          setSearchResults([])
          setSuggestions([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setSuggestions([])
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedSearch])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        suggestions,
        showSuggestions,
        setShowSuggestions,
      }}>
      {children}
    </SearchContext.Provider>
  )
}
