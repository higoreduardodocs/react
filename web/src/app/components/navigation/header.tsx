import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'

import { mergeClassName } from '../../../utils/format'
import Container from '../ui/container'
import SearchResults from '../ui/search-results'

const MENU = `px-1.5 py-1 hover:bg-primary rounded-md`
const MENU_ACTIVE = `bg-primary`

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const getClassName = (path: string) => {
    if (path === location.pathname) return mergeClassName(MENU, MENU_ACTIVE)
    return MENU
  }
  const handleSearchPage = () => {
    if (!searchKeyword) return
    navigate(`/search?q=${searchKeyword}`)
  }
  useEffect(() => {
    if (location.pathname !== '/search') setSearchKeyword('')
    setSearchFocus(false)
  }, [location])

  return (
    <header className="bg-header sticky top-0 z-20">
      <Container className="flex items-center justify-between gap-3 text-white">
        {/* BRAND AND NAV */}
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-2xl">
            Movie
          </Link>
          <div className="mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 flex items-center mobile:justify-center gap-1.5 mobile:w-full mobile:bg-header mobile:py-3">
            <Link to="/movies" className={getClassName('/movies')}>
              Filmes
            </Link>
            <Link to="/tv" className={getClassName('/tv')}>
              TV
            </Link>
          </div>
        </div>
        {/* SEARCH */}
        <div className="relative flex items-center justify-between p-1 w-full max-w-[300px] border-b-[1.5px] border-white focus:focus-within:border-primary">
          <input
            type="text"
            placeholder="Procurando por..."
            value={searchKeyword}
            className="bg-transparent outline-none"
            onInput={(e) => setSearchKeyword(e.currentTarget.value)}
            onClick={(e) => {
              e.stopPropagation()
              setSearchFocus(true)
            }}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSearchPage() : '')}
          />
          <IoIosSearch size={18} />
          {/* SEARCH RESULTS */}
          {searchFocus && searchKeyword && (
            <SearchResults
              searchKeyword={searchKeyword}
              handleSearchPage={handleSearchPage}
            />
          )}
        </div>
      </Container>
    </header>
  )
}
