/* eslint-disable react/prop-types */

import ProductCard from './product-card'

function ProductsGrid({ products }) {
  return (
    <div className="wrapper-page">
      <h1>All Products</h1>
      <div className="grid">
        {products?.length > 0 &&
          products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
      </div>
    </div>
  )
}

export default ProductsGrid
