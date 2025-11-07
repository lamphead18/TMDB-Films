import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { SearchProvider } from './contexts/SearchContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails'
import { Favorites } from './pages/Favorites'
import { Search } from './pages/Search'

function App() {
  return (
    <FavoritesProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='movie/:id' element={<MovieDetails />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='search' element={<Search />} />
            </Route>
          </Routes>
        </Router>
      </SearchProvider>
    </FavoritesProvider>
  )
}

export default App
