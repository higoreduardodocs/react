import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

import { Context } from 'src/contexts/context-provider'
import { CurrencyBRL } from 'src/utils/format'
import useFetch from 'src/hooks/use-fetch'
import Related from 'src/components/common/related'
import './product.style.scss'

function Product() {
  const { id } = useParams()
  const { addToCart } = useContext(Context)

  const [quantity, setQuantity] = useState(1)

  const data = useFetch(`/api/products?populate=*&filters[id]=${id}`)

  const removeQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1
      return quantity - 1
    })
  }

  const addQuantity = () => {
    setQuantity((prevState) => prevState + 1)
  }

  if (!data) return null

  return (
    <section className="section">
      <div className="single-product">
        <div className="single-product--image">
          <img
            src={
              import.meta.env.VITE_STRAPI_API_URL +
              data[0]?.attributes?.image?.data[0]?.attributes?.url
            }
            alt={data[0]?.attributes?.title}
          />
        </div>

        <div className="single-product--description">
          <span className="single-product--description-title">
            {data[0]?.attributes?.title}
          </span>
          <span className="single-product--description-price">
            {CurrencyBRL.format(data[0]?.attributes?.price)}
          </span>
          <span className="single-product--description-description">
            {data[0]?.attributes?.description}
          </span>

          <div className="single-product--description-button-group">
            <div className="single-product--description-button-group--quantity">
              <button type="button" onClick={() => removeQuantity()}>
                -
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => addQuantity()}>
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(data[0], quantity)
                setQuantity(1)
              }}
              className="single-product--description-button-group--cart"
            >
              <MdShoppingCart />
              Add to cart
            </button>
          </div>

          <p className="single-product--description-info">
            <span className="single-product--description-info--property">
              Category:&nbsp;
            </span>
            {data[0]?.attributes?.category?.data?.attributes?.title}
          </p>

          <p className="single-product--description-info">
            <span className="single-product--description-info--icons">
              <span className="icon">
                <FaFacebookF />
              </span>
              <span className="icon">
                <FaInstagram />
              </span>
              <span className="icon">
                <FaTwitter />
              </span>
              <span className="icon">
                <FaLinkedin />
              </span>
            </span>
          </p>
        </div>
      </div>

      <Related
        productId={id}
        categoriId={data[0]?.attributes?.category?.data?.id}
      />
    </section>
  )
}

export default Product
