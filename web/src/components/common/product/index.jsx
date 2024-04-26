/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { CurrencyBRL } from 'src/utils/format'
import './product.style.scss'

function Product({ id, product }) {
  return (
    <Link to={`/product/${id}`} className="product">
      <div className="product--image">
        <img
          src={
            import.meta.env.VITE_STRAPI_API_URL +
            product?.image?.data[0]?.attributes?.url
          }
          alt={product?.title}
        />
      </div>

      <div className="product--description">
        <span className="product--description-title">{product?.title}</span>
        <small className="product--description-price">
          {CurrencyBRL.format(product?.price)}
        </small>
      </div>
    </Link>
  )
}

export default Product
