/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { MdClose } from 'react-icons/md'

import { CurrencyBRL } from 'src/utils/format'
import { Context } from 'src/contexts/context-provider'
import './cart-item.style.scss'

function CartItem({ item }) {
  const { removeFromCart, handleQuantity } = useContext(Context)

  return (
    <div className="cart-item">
      <div className="cart-item--image">
        <img
          src={
            import.meta.env.VITE_STRAPI_API_URL +
            item?.attributes?.image?.data[0]?.attributes?.url
          }
          alt={item?.attributes?.title}
        />
      </div>

      <div className="cart-item--description">
        <span className="cart-item--description-title">
          {item?.attributes?.title}
        </span>

        <MdClose
          className="cart-item--description-remove"
          onClick={() => removeFromCart(item?.id)}
        />

        <div className="cart-item--description-button-group">
          <button type="button" onClick={() => handleQuantity(item, 'remove')}>
            -
          </button>
          <span>{item?.attributes?.quantity}</span>
          <button type="button" onClick={() => handleQuantity(item, 'add')}>
            +
          </button>
        </div>

        <div className="cart-item--description-value">
          <span>{item?.attributes?.quantity}</span>
          <span>x</span>
          <span className="cart-item--description-price">
            {CurrencyBRL.format(item?.attributes?.price)}
          </span>
        </div>

        <span className="cart-item--description-amount">
          {CurrencyBRL.format(
            item?.attributes?.quantity * item?.attributes?.price
          )}
        </span>
      </div>
    </div>
  )
}

export default CartItem
