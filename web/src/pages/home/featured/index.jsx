import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import './featured.style.scss'

function Featured() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    navigate(`/gigs?search=${search}`)
  }

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>

          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="Search" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>

        <div className="right">
          <img src="./img/man.png" alt="Man" />
        </div>
      </div>
    </div>
  )
}

export default Featured
