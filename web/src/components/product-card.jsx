/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

import { currencyPrice } from '../utils/format'

const ProductCard = ({
  title,
  slug,
  cover,
  thumbnail,
  brand,
  grid,
  description,
  price,
  stars,
}) => {
  return (
    <div
      className={`product-card position-relative ${
        grid === 12 && 'd-flex align-item-center justify-content-center'
      }`}
    >
      <div className="wishlist-icon position-absolute">
        <button className="border-0 bg-transparent">
          <img src="/icons/wish.svg" alt="Favorito" />
        </button>
      </div>

      <Link to={`/produtos/${slug}`} className="product-image">
        <img src={cover} className="img-fluid" alt={title} />
        <img src={thumbnail} className="img-fluid" alt={title} />
      </Link>

      <div className="product-details col-8 h-100">
        <h6 className="brand">{brand}</h6>
        <h5 className="product-title">{title}</h5>
        <ReactStars
          count={5}
          size={24}
          value={stars}
          edit={false}
          activeColor="#ffd700"
        />
        <p className="price">{currencyPrice.format(price)}</p>
        <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
          {description}
        </p>
      </div>

      <div className="action-bar position-absolute">
        <div className="d-flex flex-column gap-15">
          <button className="border-0 bg-transparent">
            <img src="/icons/product-compare.svg" alt="Comparar" />
          </button>
          <button className="border-0 bg-transparent">
            <img src="/icons/view.svg" alt="Visualizar" />
          </button>
          <button className="border-0 bg-transparent">
            <img src="/icons/add-cart.svg" alt="Adicionar ao carrinho" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
