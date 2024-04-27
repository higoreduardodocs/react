/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product?._id}`} className="card">
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/products/${product?._id}/photo`}
        alt={product?.name}
        height="200px"
        width="200px"
        style={{ alignSelf: 'center' }}
      />
      <h5>{product?.name}</h5>
      <h5>
        {product?.price?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </h5>
      <p>{product?.description?.substring(0, 30)}</p>
    </Link>
  )
}

export default ProductCard
