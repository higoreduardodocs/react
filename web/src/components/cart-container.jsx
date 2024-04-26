import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'

import { useStateValue } from '../contexts/initial-state'
import { actionType } from '../contexts/reducer'
import CartItem from './cart-item'

const CartContainer = () => {
  const [flag, setFlag] = useState(1)
  const [amount, setAmount] = useState(0)
  const [{ cartItems, user, showCart }, dispatch] = useStateValue()

  const toggleCart = () => {
    dispatch({
      type: actionType.SET_SHOW_CART,
      showCart: !showCart,
    })
  }

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: null,
    })
    localStorage.setItem('cartItems', null)
  }

  useEffect(() => {
    setAmount(
      cartItems
        ? cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
        : 0
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag])

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 flex flex-col w-full md:w-375 h-screen bg-white shadow-lg z-10"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={toggleCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-textColor cursor-pointer" />
        </motion.div>

        <span className="font-semibold text-lg text-textColor">Cart</span>

        <motion.button
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 text-base text-textColor bg-gray-100 rounded-md hover:shadow-md cursor-pointer"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.button>
      </div>

      {cartItems ? (
        <div className="flex flex-col w-full h-full bg-cartBg rounded-t-[2rem]">
          <div className="flex flex-col gap-3 w-full h-340 md:h-42 px-6 py-10 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>

          <div className="flex flex-col items-center justify-evenly w-full flex-1 px-8 py-2 bg-cartTotal rounded-t-[2rem]">
            <div className="flex items-center justify-between w-full">
              <p className="text-lg text-gray-400">Sub Total</p>
              <p className="text-lg text-gray-400">
                $ {parseFloat(amount.toFixed(2))}
              </p>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-lg text-gray-400">Delivery</p>
              <p className="text-lg text-gray-400">$ 2.50</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="flex items-center justify-between w-full">
              <p className="font-bold text-xl text-gray-200">Total</p>
              <p className="font-bold text-xl text-gray-200">
                $ {parseFloat((amount + 2.5).toFixed(2))}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="w-full p-2 rounded-full text-lg text-gray-50 bg-gradient-to-tr from-orange-400 to-orange-600 my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="w-full p-2 rounded-full text-lg text-gray-50 bg-gradient-to-tr from-orange-400 to-orange-600 my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
          <img
            src="/images/empty-cart.svg"
            alt="Empty cart"
            className="w-300"
          />
          <p className="font-semibold text-xl text-textColor">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  )
}
export default CartContainer
