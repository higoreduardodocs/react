/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { MdClose } from 'react-icons/md'
import { BsCartX } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

import { makePayment } from 'src/libs/api'
import { CurrencyBRL } from 'src/utils/format'
import { Context } from 'src/contexts/context-provider'
import CartItem from './cart-item'
import './cart.style.scss'

function Cart({ setShowCart }) {
  const { cartItems } = useContext(Context)
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise
      const response = await makePayment.post('/api/orders', {
        products: cartItems,
      })

      await stripe.redirectToCheckout({
        sessionId: response.data.stripeSession.id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="cart">
      <article className="cart--content">
        <div className="cart--content-header">
          <span className="cart--content-header--title">Shopping Cart</span>
          <span
            className="cart--content-header--close"
            onClick={() => setShowCart(false)}
          >
            <MdClose />
            Close
          </span>
        </div>

        {!cartItems?.length > 0 && (
          <div className="cart--content-empty">
            <BsCartX />
            <span className="cart--content-empty-title">
              No products in the cart.
            </span>
            <Link
              to="/"
              onClick={() => setShowCart(false)}
              className="cart--content-empty-button"
            >
              Return to shop
            </Link>
          </div>
        )}

        {cartItems?.length > 0 && (
          <div className="cart-items">
            <div className="cart--content-items">
              {cartItems.map((item) => (
                <CartItem key={item.id} id={item.id} item={item} />
              ))}
            </div>

            <div className="cart--content-footer">
              <div className="cart--content-footer--subtotal">
                <span className="cart--content-footer-subtotal--title">
                  Subtotal:
                </span>
                <span className="cart--content-footer-subtotal--value">
                  {CurrencyBRL.format(
                    cartItems.reduce(
                      (acc, cur) =>
                        acc +
                        cur?.attributes?.price * cur?.attributes?.quantity,
                      0
                    )
                  )}
                </span>
              </div>

              <div className="cart--cpmtemt-footer--checkout">
                <button type="button" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    </section>
  )
}

export default Cart
