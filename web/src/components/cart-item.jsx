/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BiMinus, BiPlus } from 'react-icons/bi'

import { useStateValue } from '../contexts/initial-state'
import { actionType } from '../contexts/reducer'

const CartItem = ({ item, flag, setFlag }) => {
  const [qty, setQty] = useState(item?.qty)
  const [{ cartItems }, dispatch] = useStateValue()

  const updateCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartItems,
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1)
      cartItems.map((item) => (item.id === id ? item.qty++ : ''))
      setFlag(flag + 1)
    } else {
      if (qty === 1) {
        cartItems.filter((item) => item.id !== id)
        setFlag(flag + 1)
      } else {
        setQty(qty - 1)
        cartItems.map((item) => (item.id === id ? item.qty-- : ''))
        setFlag(flag - 1)
      }
    }
  }

  useEffect(() => {
    updateCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, cartItems])

  return (
    <div className="flex items-center gap-2 w-full p-1 px-2 rounded-lg bg-cartItem">
      <img
        src={item?.imageURL}
        alt={item?.title}
        className="w-20 max-w-[60px] h-20 object-contain rounded-full"
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="font-semibold text-sm text-gray-300">$ {item?.price}</p>
      </div>

      <motion.div
        whileTap={{ scale: 0.75 }}
        className="text-gray-50 cursor-pointer"
        onClick={() => updateQty('remove', item?.id)}
      >
        <BiMinus />
      </motion.div>

      <span className="flex items-center justify-center w-5 h-5 text-gray-50 rounded-sm bg-cartBg">
        {qty}
      </span>

      <motion.div
        whileTap={{ scale: 0.75 }}
        className="text-gray-50 cursor-pointer"
        onClick={() => updateQty('add', item?.id)}
      >
        <BiPlus />
      </motion.div>
    </div>
  )
}
export default CartItem
