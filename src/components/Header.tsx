import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Film, Search, Heart, X } from 'lucide-react'
import { Button } from './ui/button'
import { useFavorites } from '../contexts/FavoritesContext'
import { useSearch } from '../contexts/SearchContext'
import { useDebounce } from '../hooks/useDebounce'
import { tmdbService } from '../services/tmdb'
import type { Movie } from '../types/movie'

export const Header = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const { favorites } = useFavorites()
  const { searchQuery, setSearchQuery } = useSearch()
  const searchRef = useRef<HTMLDivElement>(null)
  const [localSuggestions, setLocalSuggestions] = useState<Movie[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
    } else if (searchParams.toString() === '') {
      setSearchQuery('')
    }
  }, [searchParams, setSearchQuery])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.trim().length >= 2) {
        try {
          const response = await tmdbService.searchMovies(debouncedQuery, 1)
          const suggestions = response.results.slice(0, 5)
          setLocalSuggestions(suggestions)

          if (suggestions.length > 0 && searchQuery === debouncedQuery) {
            setShowSuggestions(true)
          }
        } catch (error) {
          setLocalSuggestions([])
          setShowSuggestions(false)
        }
      } else {
        setLocalSuggestions([])
        setShowSuggestions(false)
      }
    }

    fetchSuggestions()
  }, [debouncedQuery, searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowSuggestions(false)
    navigate('/')
  }

  return (
    <header className='sticky top-0 z-50 w-full glass-effect border-b border-white/10'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center gap-3 md:gap-6'>
          <Link to='/' className='flex items-center gap-2 shrink-0 group'>
            <div className='bg-gradient-primary p-2 rounded-lg'>
              <Film className='w-4 h-4 md:w-5 md:h-5 text-white' />
            </div>
            <span className='text-gradient text-lg md:text-xl font-bold hidden sm:block'>
              CineVerse
            </span>
          </Link>

          <form onSubmit={handleSearch} className='flex-1 max-w-2xl'>
            <div ref={searchRef} className='relative group'>
              <Search className='absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10' />
              <input
                type='text'
                placeholder='Buscar filmes...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  localSuggestions.length > 0 && setShowSuggestions(true)
                }
                className='w-full bg-white/5 text-white placeholder-gray-400 pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 text-sm md:text-base rounded-xl border border-white/10 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all'
              />
              {searchQuery && (
                <button
                  type='button'
                  onClick={clearSearch}
                  className='absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-white transition-colors z-10'>
                  <X className='w-full h-full' />
                </button>
              )}

              {showSuggestions && localSuggestions.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden z-50 shadow-2xl'>
                  {localSuggestions.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSuggestionClick(movie)}
                      className='w-full p-3 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 flex items-center gap-3'>
                      <img
                        src={
                          movie.poster_path
                            ? tmdbService.getImageUrl(movie.poster_path, 'w92')
                            : '/placeholder.jpg'
                        }
                        alt={movie.title}
                        className='w-8 h-12 object-cover rounded flex-shrink-0'
                      />
                      <div className='flex-1 min-w-0'>
                        <p className='text-white font-medium truncate'>
                          {movie.title}
                        </p>
                        <p className='text-gray-400 text-sm'>
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>

          <nav className='flex items-center gap-2 md:gap-3 shrink-0'>
            <Link to='/' className='hidden md:block'>
              <Button
                variant='ghost'
                className='text-gray-300 hover:text-white hover:bg-white/10'>
                Início
              </Button>
            </Link>
            <Link to='/favorites'>
              <Button className='bg-gradient-primary hover:opacity-90 text-white relative px-3 md:px-4 py-2 text-sm md:text-base'>
                <Heart className='w-4 h-4 md:mr-2' />
                <span className='hidden md:inline'>Favoritos</span>
                {favorites.length > 0 && (
                  <span className='absolute -top-1 -right-1 bg-gradient-secondary text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[10px] md:text-xs'>
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
