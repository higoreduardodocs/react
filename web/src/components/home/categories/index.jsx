/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import './categories.style.scss'

function Categories({ categories }) {
  return (
    <article className="categories">
      {categories?.length > 0 &&
        categories.map((item) => (
          <Link
            to={`/category/${item?.id}`}
            key={item?.id}
            className="categories--category"
          >
            <img
              src={
                import.meta.env.VITE_STRAPI_API_URL +
                item?.attributes?.image?.data?.attributes?.url
              }
              alt={item?.attributes?.title}
            />
          </Link>
        ))}
    </article>
  )
}

export default Categories
