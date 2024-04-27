import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { CartContext } from 'src/contexts/cart-context'
import { Public as Layout } from 'src/layouts'
import { Common } from 'src/components'

function Product() {
  const { id } = useParams()
  const { handleCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [products, setProducts] = useState([])

  const getProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
      getProducts(data._id, data.category._id)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const getProducts = async (id, categoryId) => {
    try {
      const { data } = await api.get(`/products/${id}/related/${categoryId}`)
      setProducts(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  useEffect(() => {
    getProduct()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout title={product?.name}>
      <section className="container">
        <div className="wrapper-page flex-between">
          <img
            src={`${import.meta.env.VITE_API_URL}/products/${id}/photo`}
            alt={product?.name}
            height="250px"
            width="250px"
          />

          <div className="details">
            <h1>Product Details</h1>
            <p>
              <b>Name:</b>&nbsp;{product?.name}
            </p>
            <p>
              <b>Description:</b>&nbsp;{product?.description}
            </p>
            <p>
              <b>Price:</b>&nbsp;
              {product?.price?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
            <p>
              <b>Quantity:</b>&nbsp;{product?.quantity}
            </p>
            <p>
              <b>Category:</b>&nbsp;{product?.category?.name}
            </p>
            <button
              type="button"
              onClick={() => {
                product.cartQuantity = 1
                handleCart(product)
                toast.success('Product add to cart 😄')
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <div>
          <h4>Similar Products ➡️</h4>
          <Common.ProductsGrid products={products} />
        </div>
      </section>
    </Layout>
  )
}

export default Product
