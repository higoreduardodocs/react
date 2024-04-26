/* eslint-disable react/prop-types */
import Product from '../product'

import './products.style.scss'

function Products({ title, products }) {
  return (
    <article className="products">
      {title && <h3 className="products--title">{title}</h3>}
      <div className="products--container">
        {products?.length > 0 &&
          products.map((item) => (
            <Product key={item.id} id={item.id} product={item?.attributes} />
          ))}
      </div>
    </article>
  )
}

export default Products
