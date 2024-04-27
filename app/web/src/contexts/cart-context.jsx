/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react'

export const CartContext = createContext()
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const handleCart = (data) => {
    const dataIndex = cart?.findIndex((item) => item._id === data._id)
    if (dataIndex !== -1) {
      cart[dataIndex].cartQuantity += 1
      setCart(cart)
    } else {
      setCart((prevState) => [...prevState, data])
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const removeItem = (id) => {
    setCart((prevState) => prevState.filter((item) => item._id !== id))
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const parseData = JSON.parse(localStorage.getItem('cart'))
      setCart(parseData)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CartContext.Provider value={{ cart, handleCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
