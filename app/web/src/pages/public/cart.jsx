import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import braintree from 'braintree-web-drop-in-react'
import toast from 'react-hot-toast'

import { api } from 'src/libs/api'
import { AuthContext } from 'src/contexts/auth-context'
import { CartContext } from 'src/contexts/cart-context'
import { Public as Layout } from 'src/layouts'

function Cart() {
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)
  const { cart, removeItem, clearCart } = useContext(CartContext)
  const [amount, setAmount] = useState(0)
  const [clientToken, setClientToken] = useState('')
  const [loading, setLoading] = useState(false)

  const amountCart = () => {
    setAmount(cart.reduce((acc, cur) => acc + cur.price * cur.cartQuantity, 0))
  }

  const getClientToken = async () => {
    try {
      const { data } = await api.get('/orders/generate-payment-token')
      setClientToken(data)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
    }
  }

  const handlePayment = async (nonce) => {
    try {
      setLoading(true)
      await api.post('/orders/payment-checkout', {
        nonce,
        cart,
      })
      clearCart()
      navigate('/dashboard/auth/orders')
      toast.success('Payment Completed Successfully 😉')
      setLoading(false)
    } catch (error) {
      console.log(error)
      const message = error.response.data.error
      toast.error(`${message} 😔`)
      setLoading(false)
    }
  }

  const button = document.querySelector('#submit-button')
  // eslint-disable-next-line no-undef
  braintree.dropin.create(
    {
      authorization: clientToken,
      selector: '#dropin-container',
    },
    function (err, instance) {
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (err, payload) {
          if (err) {
            console.log(err)
          } else {
            handlePayment(payload.nonce)
          }
        })
      })
    }
  )

  useEffect(() => {
    amountCart()
  }, [cart]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getClientToken()
  }, [auth?.token])

  return (
    <Layout title="Cart">
      <section className="container">
        <div className="wrapper-page">
          <h1>
            {!auth?.user
              ? 'Hello Guest'
              : `Hello ${auth?.token && auth?.user?.name}`}
            <p>
              {cart?.length
                ? `You Have ${cart.reduce(
                    (acc, cur) => acc + cur.cartQuantity,
                    0
                  )} items in your cart ${
                    auth?.token ? '' : 'please login to checkout !'
                  }`
                : 'Your Cart Is Empty'}
            </p>
          </h1>
        </div>
        {cart?.length > 0 && (
          <div className="wrapper-page cart-container">
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/products/${
                      item._id
                    }/photo`}
                    alt={item.name}
                    height="100px"
                    width="100px"
                  />
                  <div>
                    <p>
                      <b>Name:</b>&nbsp;{item.name}
                    </p>
                    <p>
                      <b>Price:</b>&nbsp;
                      {item.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </p>
                    <p>
                      <b>Stock:</b>
                      {item.quantity}
                    </p>
                    <p>
                      <b>Cart Quantity:</b>
                      {item.cartQuantity}
                    </p>
                    <button type="button" onClick={() => removeItem(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Cart Summary</h2>
              <p>
                <b>Total:</b>&nbsp;
                {amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
              {!auth?.user ? (
                <button
                  type="button"
                  onClick={() => {
                    navigate('/login', { state: '/cart' })
                  }}
                >
                  Please login to checkout
                </button>
              ) : (
                <>
                  <p>
                    <b>Address:</b>&nbsp;{auth.user.address}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/dashboard/auth', { state: '/cart' })
                    }}
                  >
                    Update Address
                  </button>
                  <div id="dropin-container"></div>
                  <button type="button" id="submit-button">
                    {loading ? 'Processing ....' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Cart
