/* eslint-disable react/prop-types */
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { CurrencyBRL } from 'src/utils/format'
import useFetch from 'src/hooks/use-fetch'
import './search.style.scss'

function Search({ setShowSearch }) {
  const [query, setQuery] = useState('')

  let data = useFetch(
    query
      ? `/api/products?populate=image&filters[title][$contains]=${query}`
      : null
  )

  if (!query) data = null

  return (
    <article className="search">
      <form className="search--form">
        <input
          // onFocus={true}
          type="text"
          className="search--form-input"
          placeholder="Search for products"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
        />

        <MdClose
          onClick={() => setShowSearch(false)}
          className="search--form-close"
        />
      </form>

      {!data?.length > 0 && (
        <span className="search--title">
          Start typing to see products you are looking for.
        </span>
      )}

      {data?.length > 0 && (
        <div className="search--results">
          {data.map((item) => (
            <Link
              key={item?.id}
              to={`/product/${item?.id}`}
              onClick={() => setShowSearch(false)}
              className="search--results-item"
            >
              <div className="search--results-item-image">
                <img
                  src={
                    import.meta.env.VITE_STRAPI_API_URL +
                    item?.attributes?.image?.data[0]?.attributes?.url
                  }
                  alt={item?.attributes?.title}
                />
              </div>

              <div className="search--results-item-description">
                <span className="search--results-item-title">
                  {item?.attributes?.title}
                </span>
                <span className="search--results-item-description">
                  {item?.attributes?.description}
                </span>
                <span className="search--results-item-price">
                  {CurrencyBRL.format(item?.attributes?.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}

export default Search
